const isJsonString = value => {
  if (typeof value !== "string" || Boolean(parseInt(value, 10))) {
    return false;
  }

  try {
    JSON.parse(value);
  } catch (e) {
    return false;
  }
  return true;
};

export default isJsonString;
