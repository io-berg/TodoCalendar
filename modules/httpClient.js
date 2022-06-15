async function getDateFact(month, day) {
  const url = `http://numbersapi.com/${month}/${day}/date`;
  return fetch(url);
}

export { getDateFact };
