export class DbOperations {
  private constructor() {}

  public static find({ table, key = {} }: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const queryKeys = Object.keys(key?.query || {});
      const verified = queryKeys.every((k) =>
        (key.allowedQuery || new Set([])).has(k)
      );
      if (!verified) return reject("Query validation issue");

      const noPaginate =
        key?.paginate === false ||
        key?.query?.paginate === "false" ||
        key?.query?.paginate === false;
      let search = key?.query?.search && true;
      if (search) {
        const [_, value] = key?.query?.search.split(":");
        if (value.trim().length === 0 || !value) {
          search = false;
          delete key.query.search;
        } else {
          search = true;
        }
      }

      key.options = noPaginate
        ? { sort: {} }
        : {
            ...(key.populate && { populate: key.populate }),
            page: Number(key?.query?.page) || 0,
            limit: Number(key?.query?.limit) || 10,
            sort: { ...(!key?.query?.sortBy && { createdAt: -1 }) },
          };

      // Prepare query object with provided queries to find
      queryKeys.forEach(async (k) => {
        if (
          typeof key?.query[k] === "string" &&
          key?.query[k].startsWith('{"') &&
          key?.query[k].endsWith("}")
        ) {
          key.query[k] = JSON.parse(key?.query[k]);
        }

        if (k === "sortBy") {
          const parts = key?.query?.sortBy;
          const fieldToSort = parts.split(",").filter(Boolean);
          fieldToSort.forEach((partKey: string) => {
            const partSingle = partKey.split(":");
            return (key.options.sort[partSingle[0]] =
              partSingle[1] === "desc" ? -1 : 1);
          });
          // return (key.options.sort[parts[0]] = parts[1] === "desc" ? -1 : 1);
        }

        if (k === "search" && key?.query[k]) {
          const parts = key?.query?.search.split(":");
          const [_, v] = parts;
          return (key.options[parts[0]] = {
            $regex: parts[1],
            $options: "i",
          });
        }

        if (k === "id") {
          key._id = key?.query?.id;
          return delete key?.query?.id;
        }

        key[k] = key?.query[k];
      });

      const method = noPaginate ? "find" : "paginate";
      const options = key.options;

      // Check if populate is an object, if so, convert it to an array format
      const populate = Array.isArray(key.populate)
        ? key.populate
        : key.populate
        ? [key.populate]
        : [];

      delete key.allowedQuery;
      delete key.populate;
      delete key.paginate;
      delete key.options;
      delete key?.query;
      const args = search
        ? [{ ...options, ...key }]
        : [key, ...(noPaginate ? [null] : []), options];
      // Ensure table[method](...args) returns a Promise
      const result = table[method](...args);

      if (noPaginate) {
        if (populate.length) {
          result.populate(populate).exec().then(resolve).catch(reject);
        } else {
          resolve(result);
        }
      } else {
        result
          .then(async (res: any) => {
            // Populate each document in `docs` array if there are fields to populate
            if (populate.length) {
              const populatedDocs = await table.populate(res.docs, populate);
              res.docs = populatedDocs; // replace docs with populated docs
            }
            resolve(res);
          })
          .catch((e: any) => reject(e));
      }
    });
  }

  public static async findOne({ table, key = {} }: any): Promise<any> {
    if (key.id) key._id = key.id;
    delete key.id;
    if (Object.keys(key).length < 1) return null;
    const res = await table
      .findOne(key)
      .populate(key.populate?.path, key.populate?.select?.split(" "));
    return res;
  }

  public static async create({ table, key }: any): Promise<any> {
    const elem = await new table(key);
    const res = await elem.save();
    key.populate && (await res.populate(key.populate));
    return res;
  }

  public static async update({ table, key }: any): Promise<any> {
    if (key.id) key._id = key.id;
    delete key.id;
    const element = await table.findOne(key);
    if (!element) return Promise.resolve(element);
    Object.keys(key.body || {}).forEach(
      (param) => (element[param] = key.body[param])
    );
    const res = await element.save();
    key.populate &&
      (await res.populate(
        key.populate?.path,
        key.populate?.select?.split(" ")
      ));
    return Promise.resolve(element);
  }

  public static async remove(target: any): Promise<any> {
    const { table, key, _id } = target;
    if (_id) {
      //if mongodb instance found then delete with obj.remove method.
      await target.remove();
      return Promise.resolve(target);
    }
    if (key.id) key._id = key.id;
    delete key.id;
    const element = await table.findOne(key);
    if (!element) return Promise.resolve(element);
    await element.remove();
    return Promise.resolve(element);
  }

  public static async removeAll({ table, key }: any): Promise<any> {
    const res = await table.deleteMany(key);
    return Promise.resolve(res);
  }

  public static async updateMany({ table, key }: any) {
    const { filter, update, options, callback } = key;
    const res = await table.updateMany(filter, update, options, callback);
    return Promise.resolve(res);
  }

  public static async save(data: any): Promise<any> {
    await data.save();
  }

  public static async populate(data: any, payload = {}): Promise<any> {
    await data.populate(payload);
  }

  public static async sort(data: any, payload = {}) {
    await data.sort(payload);
  }

  public static async aggregate({ table, key }: any) {
    await table.aggregate(key);
  }

  public static async bulkCreate({ table, docs }: any) {
    await table.insertMany(docs, { ordered: false });
  }
}
