const ArrayToQuery = (arr, arrName) => {
  let query = '';
  arr.forEach((value, index) => {
    const and = index == 0 ? '' : '&';
    const str = `${and + arrName}=${value}`;
    query += str;
  });
  return query;
};

module.exports = {
  ArrayToQuery,
};
