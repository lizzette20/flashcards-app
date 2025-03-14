import React, { useState } from "react";
import "../App.css";
import stringSimilarity from "string-similarity";

export default function Flashcard({ card, onNext, onIncorrect, onMaster }) {
  const [flipped, setFlipped] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");  
  const [isCorrect, setIsCorrect] = useState(null);  
  const [answered, setAnswered] = useState(false);  

  const checkAnswer = () => {
    console.log("📝 Checking answer...");

    if (!userAnswer.trim()) {
      console.log("⚠ No answer provided.");
      setIsCorrect(false);
      setAnswered(true);
      return;
    }

    const cleanedUserAnswer = userAnswer.toLowerCase().trim();
    const possibleAnswers = card.answer.map(a => a.toLowerCase().trim());

    const correct = possibleAnswers.some(answer => {
      const similarity = stringSimilarity.compareTwoStrings(cleanedUserAnswer, answer);
      return similarity >= 0.85 || cleanedUserAnswer === answer;
    });

    setIsCorrect(correct);
    setAnswered(true);

    if (correct) {
      console.log("✅ Correct answer! Unlocking next step.");
      setFlipped(true);
      onNext();
    } else {
      console.log("❌ Wrong answer! Try again.");
      onIncorrect();
    }
  };

  const handleInputChange = (e) => {
    setUserAnswer(e.target.value);
    setIsCorrect(null);
  };

  return (
    <div className="flashcard-container">
      <div className={`flashcard ${flipped ? "flipped" : ""}`}>
        {!flipped ? (
          <div className="flashcard-face front">
            <p>{card.question}</p>
            <input
              type="text"
              value={userAnswer}
              onChange={handleInputChange}
              placeholder="Your answer..."
              className={`answer-input ${isCorrect === false ? "incorrect-input" : ""}`}
            />
            <button onClick={checkAnswer} className="submit-btn">Submit</button>
            {isCorrect === false && <p className="error-text">❌ Wrong Answer! Try Again.</p>}
          </div>
        ) : (
          <div className="flashcard-face back">
            <p>{card.answer[0]}</p>
            <img src={card.image} alt="Mexican History" className="flag" />
          </div>
        )}
      </div>

      {answered && isCorrect && (
        <button onClick={onMaster} className="nav-btn">
          ✅ Mark as Mastered
        </button>
      )}
    </div>
  );
}





