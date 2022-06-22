async function getDateFact(month, day) {
  const url = `http://numbersapi.com/${month}/${day}/date`;
  return fetch(url);
}

async function getUser() {
  const url = `https://randomuser.me/api/`;
  return fetch(url);
}

export { getDateFact, getUser };
