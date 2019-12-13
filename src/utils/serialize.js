export default obj => {
  const str = [];

  Object.entries(obj).forEach(item => {
    if (item[1]) {
      str.push(`${encodeURIComponent(item[0])}=${encodeURIComponent(item[1])}`);
    }
  });

  return str.join("&");
};
