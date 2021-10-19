const handOptions = {
  paper: "assets/Paper.png",
  rock: "assets/Rock.png",
  scissors: "assets/Scissors.png",
};

let theScore = 0;
let trailsNumber = 0;

const pickUserhand = (hand) => {
  //1- hide the current page
  let hands = document.querySelector(".hands");
  hands.style.display = "none";

  //2- show the next page with the hand you picked
  let contest = document.querySelector(".contest");
  contest.style.display = "flex";

  //3- set the user pick
  document.getElementById("userPickImage").src = handOptions[hand];

  //4- set computer pick
  let cpHand = pickComputerHand();

  //5- decide the winner or loss state
  referee(hand, cpHand);

  //6- count no. of trails
  trailsNumber += 1;
  document.querySelector(".totalTrails").innerText = trailsNumber;

  //7- count percentage
  percentage(theScore, trailsNumber);
};

const pickComputerHand = () => {
  let hands = ["rock", "paper", "scissors"];
  let cpHand = hands[Math.floor(Math.random() * hands.length)];
  document.getElementById("computerPickImage").src = handOptions[cpHand];
  return cpHand;
};

const referee = (userHand, cpHand) => {
  // paper selected
  if (userHand === "paper" && cpHand === "scissors") {
    setDecision("YOU LOSE!");
  } else if (userHand === "paper" && cpHand === "rock") {
    setDecision("YOU WIN!");
    setScore();
  } else if (userHand === "paper" && cpHand === "paper") {
    setDecision("It's a tie!");
  }
  // rock selected
  else if (userHand === "rock" && cpHand === "paper") {
    setDecision("YOU LOSE!");
  } else if (userHand === "rock" && cpHand === "scissors") {
    setDecision("YOU WIN!");
    setScore();
  } else if (userHand === "rock" && cpHand === "rock") {
    setDecision("It's a tie!");
  }
  // scissors selected
  else if (userHand === "scissors" && cpHand === "rock") {
    setDecision("YOU LOSE!");
  } else if (userHand === "scissors" && cpHand === "paper") {
    setDecision("YOU WIN!");
    setScore();
  } else if (userHand === "scissors" && cpHand === "scissors") {
    setDecision("It's a tie!");
  }
};

const restartGame = () => {
  //1- hide the picked hand page
  let contest = document.querySelector(".contest");
  contest.style.display = "none";

  //2- displays the hands page
  let hands = document.querySelector(".hands");
  hands.style.display = "flex";

  //3- reset animation container height
  document.querySelector(".svg").innerText = null;

  //4- rest lose animation container
  document.querySelector(".loseAnimation").innerText = null;
  document.querySelector(".loseAnimation").classList.remove("setArea");
};

const setDecision = (decision) => {
  document.querySelector(".decision h1").innerText = decision;
  if (decision === "It's a tie!" || decision === "YOU LOSE!") {
    loseAnimation();
    tryAgainSound();
  }
};

const setScore = () => {
  theScore += 1;
  document.querySelector(".score h1").innerText = theScore;
  document.querySelector(".wins").innerText = theScore;
  playAnimation();
  winSound();
};

const percentage = (winsNum, trailsNum) => {
  let thePercent = Math.round((winsNum / trailsNum) * 100);
  document.querySelector(".percent").innerText = thePercent + " %";
};

const resetPage = () => {
  theScore = 0;
  trailsNumber = 0;
  document.querySelector(".score h1").innerText = theScore;
  document.querySelector(".wins").innerText = theScore;
  document.querySelector(".percent").innerText = 0 + " %";
  document.querySelector(".totalTrails").innerText = trailsNumber;
};

const playAnimation = () => {
  const animationContainer = document.querySelector(".svg");
  const animationItem = bodymovin.loadAnimation({
    wrapper: animationContainer,
    animType: "svg",
    loop: false,
    autoplay: false,
    path: "https://assets3.lottiefiles.com/packages/lf20_u4yrau.json",
  });
  animationItem.goToAndPlay(0, true);
};

const loseAnimation = () => {
  const animationContainer = document.querySelector(".loseAnimation");
  animationContainer.classList.add("setArea");
  const animationItem = bodymovin.loadAnimation({
    wrapper: animationContainer,
    animType: "svg",
    loop: false,
    autoplay: false,
    path: "https://assets3.lottiefiles.com/packages/lf20_F2Mv1p.json",
  });
  animationItem.goToAndPlay(0, true);
};

const winSound = () => {
  const winMusic = new Audio("assets/win.wav");
  winMusic.play();
};

const tryAgainSound = () => {
  const tryAgain = new Audio("assets/tryagain.wav");
  tryAgain.play();
};
