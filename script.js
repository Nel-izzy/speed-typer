const settings = document.getElementById("settings");
const settingsBtn = document.getElementById("settings-btn");
const formSettings = document.getElementById("form-settings");
const difficultyEl = document.getElementById("difficulty");
const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const endGameContainer = document.getElementById("end-game-container");
const timeEl = document.getElementById("time");

let score = 0;
let time = 10;
let randomWord;
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";
difficultyEl.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";
const words = [
  "sigh",
  "tense",
  "airplane",
  "ball",
  "pies",
  "juice",
  "warlike",
  "bad",
  "north",
  "dependent",
  "steer",
  "silver",
  "highfalutin",
  "superficial",
  "quince",
  "eight",
  "feeble",
  "admit",
  "drag",
  "loving",
];

text.focus();

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}
function addWordToDom() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

//start counting down
const timeInterval = setInterval(updateTime, 1000);

function updateTime() {
  time--;
  timeEl.innerText = `${time}s`;
  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
}
function gameOver() {
  endGameContainer.innerHTML = `<h1> Time ran out</h1>
                                   <p>Your final score is ${score}</p>
                                   <button onclick="location.reload()">Reload</button>`;
  endGameContainer.style.display = "flex";
}
text.addEventListener("input", (e) => {
  const typedWord = e.target.value;
  if (typedWord === randomWord) {
    score++;
    scoreEl.innerText = score;
    addWordToDom();
    e.target.value = "";
    if (difficulty === "hard") {
      time += 1;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 5;
    }

    updateTime();
  }
});

formSettings.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});
addWordToDom();
