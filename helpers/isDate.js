const { isValid, getTime } = require("date-fns");

const isDate = (value) => {
  if (!value) return false;

  const getMiliseconds = getTime(value);
  const date = isValid(getMiliseconds); // returns true or false
  return date;
};

module.exports = {
  isDate,
};
