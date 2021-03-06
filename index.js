const marvel = [
  {
    hero: "Spider-Man",
    name: "Peter Benjamin Parker",
    link: "http://marvel.com/characters/54/spider-man",
    img:
      "https://cnet1.cbsistatic.com/img/rfzZ-7G32v_qEt2uCD0b4KB2rho=/940x0/2019/03/26/13d0a566-7355-4381-be24-dee281227504/spider-man-far-from-home-promo-image-1.jpg",
    size: 40000,
  },
  {
    hero: "HULK",
    name: "Robert Bruce Banner",
    link: "http://marvel.com/characters/25/hulk",
    img:
      "https://icdn.lenta.ru/images/0000/0163/000001631172/detail_1358665194.jpg",
    size: 40000,
  },
  {
    hero: "Captain America",
    name: "Steven Rogers",
    link: "http://marvel.com/characters/8/captain_america",
    img:
      "https://cf-images.us-east-1.prod.boltdns.net/v1/static/5359769168001/0a823cb0-01a9-4835-a348-c64187783ccb/d37cb96c-805c-4aa2-9f2f-e62d9eb814c7/1280x720/match/image.jpg",
    size: 40000,
  },
  {
    hero: "Iron Man",
    name: "Anthony Edward 'Tony' Stark",
    link: "http://marvel.com/characters/29/iron_man",
    img:
      "https://mk0uploadvrcom4bcwhj.kinstacdn.com/wp-content/uploads/2020/07/iron-man-vr-impulse-armor-flying.jpeg",
    size: 40000,
  },
  {
    hero: "THOR",
    name: "Thor Odinson",
    link: "http://marvel.com/characters/60/thor",
    img:
      "https://upload.wikimedia.org/wikipedia/en/thumb/3/3c/Chris_Hemsworth_as_Thor.jpg/220px-Chris_Hemsworth_as_Thor.jpg",
    size: 40000,
  },
];

let jsonMarvel = JSON.stringify(marvel);
let heroes;

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("heroes")) {
    heroes = JSON.parse(localStorage.getItem("heroes"));
  } else {
    heroes = JSON.parse(jsonMarvel);
  }

  let id = 0;
  for (hero of heroes) {
    document.body.innerHTML += `<div class="heroes">
    <div>
    <p class="name">${hero.hero} <span>${hero.rate ? hero.rate : ""}</span></p> 
    <p class="name">${hero.name}</p>
    <p><input class="input-rate${id}" type="number" max="10" placeholder="Rate from 0 to 10" /></p>
    <p><button class="button" onclick="rateHero(${id})">Rate</button></p>
    <div class="set-rate${id}"></div>
    <div>
  <img class="img" src="${hero.img}" alt="superhero"/>
    </div>
    </div>
    </div>`;
    id++;
  }
  document.body.innerHTML += `<h1>Random GIF</h1><button class="btn" onclick="getGif()">Get random GIF </button>`;
});

function rateHero(id) {
  let inputRate = document.querySelector(`.input-rate${id}`).value;
  document.querySelector(
    `.set-rate${id}`
  ).innerText += `Your rate is ${inputRate}`;
  heroes[id].rate = inputRate;
  localStorage.setItem("heroes", JSON.stringify(heroes));
  // inputRate = "";
}

async function getGif() {
  if (document.querySelectorAll(".gif").length < 3) {
    return fetch(
      "https://api.giphy.com/v1/gifs/random?api_key=cENQvJ74DRaUDEF1CjQtSA6fpsYFHG1l&tag=&rating=g"
    )
      .then((response) => response.json())
      .then(
        (data) =>
          (document.body.innerHTML += `<div><img class="gif" src="${data.data.images.downsized_medium.url}" alt="gif" /></div>`)
      )
      .then(() => console.error());
  } else return false;
}
