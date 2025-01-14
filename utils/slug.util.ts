const slug = require("slug");

const convert = (value: string) => {
  return slug(value);
}

const slugUtil = {
  convert
};
export default slugUtil;