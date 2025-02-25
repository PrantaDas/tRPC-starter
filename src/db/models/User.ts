import { model, Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";
import bcrypt from "bcrypt";
import { IUser } from "../../types";

const schema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"]
    }
  },
  { timestamps: true }
);

schema.pre("save", async function (next) {
  const user = this;
  if (this.isModified("password")) {
    if (this.isModified("password")) {
      user.password = await bcrypt.hash(user.password, 10);
    }
    next();
  }
  next();
});

schema.plugin(paginate);

schema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.__v;
  return obj;
};

const User = model<IUser>("User", schema, "users");

export default User;
