import React, { useState, useEffect } from 'react';
import './App.css';

const images = [
  '🐱', '🐱', '🐶', '🐶',
  '🐰', '🐰', '🐯', '🐯',
  '🦊', '🦊', '🐻', '🐻',
];

const shuffleArray = (array) => {
  const shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const App = () => {
  const [cards, setCards] = useState(shuffleArray(images));
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [isGameCompleted, setGameCompleted] = useState(false);

  useEffect(() => {
    if (flippedIndices.length === 2) {
      const [index1, index2] = flippedIndices;
      if (cards[index1] === cards[index2]) {
        setMatchedPairs((prev) => [...prev, cards[index1]]);
      }
      setTimeout(() => setFlippedIndices([]), 500);
    }
  }, [flippedIndices, cards]);

  // Check if all cards are matched and no unflipped cards left
  useEffect(() => {
    if (matchedPairs.length === cards.length / 2 && flippedIndices.length === 0) {
      setGameCompleted(true);
    }
  }, [matchedPairs, cards, flippedIndices]);

  const handleCardClick = (index) => {
    if (flippedIndices.length < 2 && !flippedIndices.includes(index) && !matchedPairs.includes(cards[index])) {
      setFlippedIndices((prev) => [...prev, index]);
    }
  };
  const renderCard = (index) => (
    <div
      key={index}
      className={`card ${flippedIndices.includes(index) || matchedPairs.includes(cards[index]) ? 'flipped' : ''}`}
      onClick={() => handleCardClick(index)}
    >
      {flippedIndices.includes(index) || matchedPairs.includes(cards[index]) ? cards[index] : '?'}
    </div>
  );

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <div className="card-grid">
        {cards.map((_, index) => renderCard(index))}
      </div>
      {isGameCompleted && (
        <div className="completion-message">
          <p>Congratulations! You have successfully completed the game.</p>
        </div>
      )}
      <footer className="footer">
        <p>Made with ❤️ by Viraj</p>
      </footer>
    </div>
  );
};

export default App;
