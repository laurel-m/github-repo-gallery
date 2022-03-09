// profile information //
const overview = document.querySelector(".overview");
const username = "laurel-m";

// function to pull GitHub profile info //
const getInfo = async function () {
    const profileInfo = await fetch (`https://api.github.com/users/${username}`);
    const data = await profileInfo.json();
    console.log(data);
    userInfo(data);
};

getInfo();

// function to fetch & display user info //
const userInfo = function (data) {
    const user = document.createElement("div");
    user.classList.add("user-info");
    user.innerHTML = `
    <figure>
      <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div> `;
    overview.append(user);
};

