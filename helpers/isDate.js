const { isValid } = require("date-fns");

const isDate = (value) => {
  if (!value) return false;

  const date = isValid(value); // returns true or false
  return date;
};

module.exports = {
  isDate,
};
