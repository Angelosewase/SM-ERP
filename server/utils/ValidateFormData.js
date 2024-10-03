const z = require("zod");

const NonEmptyString = z.string().min(1);

function ValidateValue(value) {
  return NonEmptyString.safeParse(value);
}
