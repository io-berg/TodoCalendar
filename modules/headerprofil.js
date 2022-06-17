async function getRandomUser() {
  const response = await fetch(`https://randomuser.me/api/`);
  const data = await response.json();
  const user = data.results[0];
  //console.log(user);
  displayUser(user);
}
function displayUser(user) {
  const name = document.getElementById("name");
  const image = document.getElementById("image");

  name.innerText = `${user.name.title} ${user.name.first} ${user.name.last}`;
  image.setAttribute(`src`, `${user.picture.large}`);
}

const userBtn = document.getElementById("userBtn");
userBtn.addEventListener("click", getRandomUser);

export { getRandomUser };
