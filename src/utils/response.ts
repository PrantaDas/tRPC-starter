export const successResponse = (data: any, message = "Success") => ({
  status: "success",
  message,
  data,
});

export const errorResponse = (
  message: string,
  code = 500,
  errors: any = null
) => ({
  status: "error",
  message,
  code,
  errors,
});
