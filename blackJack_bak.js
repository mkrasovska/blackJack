let suits = ['♣', '♠', '♢', '♡'];
let names = ['6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];
let stopGame = { playerOne: false, playerTwo: false };
let winner = 0;
let opencard;
// let stopGame = false;

let cardsObj = [];
let riskLevel = ['safe', 'intermediate', 'high-risk'];
let playerOne = [];
let playerTwo = [];
let values = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  jack: 2,
  queen: 3,
  king: 4,
  ace: 11
};

for (i = 0; i < suits.length; i++) {
  for (j = 0; j < names.length; j++) {
    let newCardObj = {
      name: names[j],
      suit: suits[i],
      value: values[names[j]]
    };

    cardsObj.push(newCardObj);
  }
}

function randomCardNumber() {
  return Math.floor(Math.random() * cardsObj.length);
}

for (let i = 0; i < cardsObj.length; i++) {
  let randomNumber = randomCardNumber();
  changeCard = cardsObj[i];
  cardsObj[i] = cardsObj[randomNumber];
  cardsObj[randomNumber] = changeCard;
}

// console.log(cardsObj);

while (!stopGame.playerOne || !stopGame.playerTwo) {
  if (!stopGame.playerOne) {
    opencard = cardsObj.pop();
    console.log('Player One took ' + opencard.name + ' of ' + opencard.suit);
    playerOne.push(opencard);
    if (scoreSum(playerOne) >= 15 || stopGame.playerTwo) {
      //   winner = 'Player One';
      stopGame.playerOne = true;
      //   break;
    }

    if (scoreSum(playerOne) > 21) {
      console.log('Player One has two much');
      stopGame.playerOne = true;
      //   break;
    }
  }

  if (!stopGame.playerTwo) {
    opencard = cardsObj.pop();
    console.log('Player Two took ' + opencard.name + ' of ' + opencard.suit);
    playerTwo.push(opencard);
    if (scoreSum(playerTwo) >= 15 || stopGame.playerOne) {
      //   winner = 'Player Two';
      stopGame.playerTwo = true;
      //   break;
    }

    if (scoreSum(playerTwo) > 21) {
      console.log('Player Two has two much');
      stopGame.playerTwo = true;
      //   break;
    }
  }
}
if (
  (scoreSum(playerOne) > scoreSum(playerTwo) && scoreSum(playerOne) <= 21) ||
  (scoreSum(playerOne) <= 21 && scoreSum(playerTwo) > 21)
) {
  winner = 'Player One';
}
if (
  (scoreSum(playerTwo) > scoreSum(playerOne) && scoreSum(playerTwo) <= 21) ||
  (scoreSum(playerTwo) <= 21 && scoreSum(playerOne) > 21)
) {
  winner = 'Player Two';
}
if (scoreSum(playerTwo) === scoreSum(playerOne)) {
  winner = 'Nobody';
}

function scoreSum(arr) {
  sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum = sum + arr[i].value;
  }
  return sum;
}

console.log('\n' + winner + ' has won! Cheers!\n');
console.log('player one :' + scoreSum(playerOne));
console.log(playerOne);
console.log('player two :' + scoreSum(playerTwo));
console.log(playerTwo);

// console.log(scoreSum(cardsObj));
