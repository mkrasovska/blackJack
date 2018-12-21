function blackJack() {
  logStr = '';

  let suits = ['♣', '♠', '♦', '♥'];
  let names = ['6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];
  let stopGame = { playerOne: false, playerTwo: false };
  let winner = 0;
  let opencard;
  let cardsObj = [];
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

  opencard = cardsObj.pop();
  console.log('You took ' + opencard.name + ' of ' + opencard.suit);
  logStr =
    logStr + 'You took ' + opencard.name + ' of ' + opencard.suit + '</br>';

  playerOne.push(opencard);
  opencard = cardsObj.pop();
  console.log('Player Two took a card');
  logStr = logStr + 'Player Two took a card' + '</br>';

  document.getElementById('gamelog').innerHTML = logStr;

  playerTwo.push(opencard);

  while (!stopGame.playerOne || !stopGame.playerTwo) {
    let answer = prompt('One more card?, Y/N', 'Y');
    if (answer === 'N' && !stopGame.playerTwo) {
      // alert('You stopped the game. Player Two can take one more card');
      logStr =
        logStr +
        'You stopped the game. Player Two can take one more card' +
        '</br>';
      document.getElementById('gamelog').innerHTML = logStr;

      stopGame.playerOne = true;
    }

    if (answer === 'N') {
      stopGame.playerOne = true;
    }

    if (!stopGame.playerOne) {
      opencard = cardsObj.pop();
      console.log('You took ' + opencard.name + ' of ' + opencard.suit);
      logStr =
        logStr + 'You took ' + opencard.name + ' of ' + opencard.suit + '</br>';
      document.getElementById('gamelog').innerHTML = logStr;

      playerOne.push(opencard);
      if (stopGame.playerTwo) {
        stopGame.playerOne = true;
      }

      if (scoreSum(playerOne) > 21) {
        console.log('You have too much! Looser!');
        logStr = logStr + 'You have too much! Looser! ' + '</br>';
        document.getElementById('gamelog').innerHTML = logStr;

        stopGame.playerOne = true;
      }
    }

    if (!stopGame.playerTwo) {
      opencard = cardsObj.pop();
      console.log('Player Two took a card');
      logStr = logStr + 'Player Two took a card' + '</br>';
      document.getElementById('gamelog').innerHTML = logStr;

      playerTwo.push(opencard);

      if (scoreSum(playerTwo) >= 15 || stopGame.playerOne) {
        stopGame.playerTwo = true;
        if (!stopGame.playerOne) {
          console.log(
            'Player Two stopped the game. You can take one more card.'
          );
          logStr =
            logStr +
            'Player Two stopped the game. You can take one more card.' +
            '</br>';
          document.getElementById('gamelog').innerHTML = logStr;
        }
      }

      if (scoreSum(playerTwo) > 21) {
        console.log('Player Two has too much' + '</br>');
        stopGame.playerTwo = true;
      }
    }
  }
  if (
    (scoreSum(playerOne) > scoreSum(playerTwo) && scoreSum(playerOne) <= 21) ||
    (scoreSum(playerOne) <= 21 && scoreSum(playerTwo) > 21)
  ) {
    winner = 'You';
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

  console.log('\n' + winner + ' have won! Cheers!\n');
  console.log('You :' + scoreSum(playerOne));
  console.log(playerOne);
  console.log('Player Two :' + scoreSum(playerTwo));
  console.log(playerTwo);

  logStr = logStr + winner + ' have won! Cheers! </br>';
  logStr = logStr + 'You :' + scoreSum(playerOne) + '</br>';
  logStr = logStr + 'Player two :' + scoreSum(playerTwo) + '</br>';
  document.getElementById('gamelog').innerHTML = logStr;
}
