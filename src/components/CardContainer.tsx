import "../App.css";
import Card from "./Card";
import { useEffect, useState } from "react";

const rng = (n: number) => {
  const arr = [];
  for (let x = 0; x < n; x++) {
    arr.push(Math.floor(Math.random() * 1025) + 1);
  }
  return arr;
};
const randomNumbers = rng(12);
let clickedCards: number[] = [];

let highestScore = 0;

function CardContainer() {
  const [shuffled, setShuffled] = useState(false);

  const [score, setScore] = useState(0);

  let cards = randomNumbers.map((n) => (
    <Card
      randomNumber={n}
      onClick={() => {
        handleClick(n);
      }}
      id={n}
      key={n}
    />
  ));

  function handleClick(n: number) {
    setShuffled(!shuffled);

    console.log(clickedCards);
    if (clickedCards.indexOf(n) === -1) {
      clickedCards.push(n);
      setScore((prevScore) => prevScore + 1);
    } else {
      if (score >= highestScore) {
        highestScore = score;
      }
      clickedCards = [];
      setScore(0);
    }

    console.log(n);
    console.log(`x before: ${randomNumbers}`);
    shuffle(randomNumbers);
    console.log(`x after: ${randomNumbers}`);
    console.log("Clicked!");

    /* cards = randomNumbers.map((n) => (
      <Card randomNumber={n} onClick={handleClick} />
    )); */
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    cards = randomNumbers.map((n) => (
      <Card
        randomNumber={n}
        onClick={() => {
          handleClick(n);
        }}
        id={n}
        key={n}
      />
    ));
  }, [shuffled]);

  function shuffle(array: number[]) {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  return (
    <>
      <h1>{`Score: ${score}`}</h1>
      <h2>{`Highest Score: ${highestScore}`}</h2>
      <div className="card-container">{cards}</div>
    </>
  );
}

export default CardContainer;
