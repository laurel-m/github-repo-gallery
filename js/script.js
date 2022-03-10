// profile information //
const overview = document.querySelector(".overview");
const username = "laurel-m";
const repoList = document.querySelector(".repo-list");
const repoInfoAppear = document.querySelector(".repos");
const repoDataAppear = document.querySelector(".repo-data");

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
    repoPull();
};

// function to fetch repos //
const repoPull = async function () {
  const repoInfo = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  const repoData = await repoInfo.json();
  repoDisplay(repoData);
};

// function to display repo info //
const repoDisplay = function (repos) {
  for (const repo of repos) {
    const repoItem = document.createElement("li");
    repoItem.classList.add("repo");
    repoItem.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(repoItem);
  } 
};

// click event for repo list //
repoList.addEventListener("click", function (e) {
  if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
    specificRepoInfo(repoName);
  }
});

// function to get specific repo info //
const specificRepoInfo = async function (repoName) {
  const specificRepo = await fetch (`https://api.github.com/repos/${username}/${repoName}`);
  const repoInfo = await specificRepo.json();
  const fetchLanguages = await fetch (`https://api.github.com/repos/${username}/${repoName}/languages`);
  const languageData = await fetchLanguages.json();
  const languages = []; 
    for (const language in languageData) {
      languages.push(language);
    }
    displayInfo(repoInfo,languages);
  };

const displayInfo = function (repoInfo, languages) {
  repoDataAppear.innerHTML = "";
  const info = document.createElement("div");
  info.innerHTML = `
  <h3>Name: ${repoInfo.name}</h3>
  <p>Description: ${repoInfo.description}</p>
  <p>Default Branch: ${repoInfo.default_branch}</p>
  <p>Languages: ${languages.join(", ")}</p>
  <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`
  repoDataAppear.append(info);
  repoDataAppear.classList.remove("hide");
  repoInfoAppear.classList.add("hide");
};

