import React, { useState } from "react";
import Flashcard from "./components/Flashcard";
import "./App.css";

export default function App() {
  const [mexicanHistoryFacts, setMexicanHistoryFacts] = useState([
    { 
      question: "What is the national sport of Mexico?", 
      answer: ["Charrería", "Charreria", "charreria"], 
      image: "/images/sport.jpeg" 
    },
    { 
      question: "What is Mexico's most famous ancient site?", 
      answer: ["Chichén Itzá", "Chichen Itza", "chichen itza"], 
      image: "/images/pyramid.jpeg" 
    },
    { 
      question: "What are the roots of Mexican folk music?", 
      answer: ["Mariachi", "mariachi"], 
      image: "/images/mariachi.jpeg" 
    },
    { 
      question: "How did Mexican muralism impact modern art?", 
      answer: ["Diego Rivera", "diego rivera"], 
      image: "/images/mural.jpeg" 
    },
    { 
      question: "How has Mexican literature influenced global storytelling?", 
      answer: ["Octavio Paz", "octavio paz"], 
      image: "/images/library.jpeg" 
    }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [masteredCards, setMasteredCards] = useState(new Set());
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  function nextCard() {
    console.log("➡ Moving to the next card...");

    let nextIndex = (currentIndex + 1) % mexicanHistoryFacts.length;

    let attempts = 0;
    while (masteredCards.has(mexicanHistoryFacts[nextIndex]) && attempts < mexicanHistoryFacts.length) {
      console.log("⚠ Skipping mastered card:", mexicanHistoryFacts[nextIndex].question);
      nextIndex = (nextIndex + 1) % mexicanHistoryFacts.length;
      attempts++;
    }

    if (attempts >= mexicanHistoryFacts.length) {
      console.log("⚠ All cards are mastered. Stopping navigation.");
      return;
    }

    setCurrentIndex(nextIndex);
  }

  function prevCard() {
    let prevIndex = (currentIndex - 1 + mexicanHistoryFacts.length) % mexicanHistoryFacts.length;
    while (masteredCards.has(mexicanHistoryFacts[prevIndex])) {
      prevIndex = (prevIndex - 1 + mexicanHistoryFacts.length) % mexicanHistoryFacts.length;
    }
    setCurrentIndex(prevIndex);
  }

  function shuffleCards() {
    const shuffled = [...mexicanHistoryFacts].sort(() => Math.random() - 0.5);
    setMexicanHistoryFacts(shuffled);
    setCurrentIndex(0);
  }

  function markAsMastered() {
    console.log("🏆 Marking as mastered:", mexicanHistoryFacts[currentIndex].question);
    setMasteredCards((prev) => new Set([...prev, mexicanHistoryFacts[currentIndex]]));
    nextCard();
  }

  function handleCorrectAnswer() {
    console.log("✅ Correct Answer!");
    setCurrentStreak((prev) => prev + 1);
    if (currentStreak + 1 > longestStreak) {
      setLongestStreak(currentStreak + 1);
    }
  }

  function handleIncorrectAnswer() {
    console.log("❌ Incorrect Answer!");
    setCurrentStreak(0);
  }

  return (
    <div className="App">
      <div className="header-box">
        <h1 className="header">México en Memoria 💌</h1>
        <h2 className="subheader">Put your knowledge of Mexican heritage to the test!</h2>
        <h3 className="total-cards">Remaining Cards: {mexicanHistoryFacts.length - masteredCards.size}</h3>
        <button onClick={shuffleCards} className="nav-btn">🔀 Shuffle</button>

        {/* ✅ New Streak Counter (Cleaner) */}
        <div className="streak-counter">
          <h3>🔥 Streak: {currentStreak} | 🏆 Best: {longestStreak}</h3>
        </div>
      </div>

      <Flashcard 
        card={mexicanHistoryFacts[currentIndex]} 
        onNext={handleCorrectAnswer} 
        onIncorrect={handleIncorrectAnswer}
        onMaster={markAsMastered} 
      />

      <div className="button-container">
        <button onClick={prevCard} className="nav-btn">⬅ Back</button>
        <button onClick={nextCard} className="nav-btn">Next ➡</button>
      </div>
    </div>
  );
}









