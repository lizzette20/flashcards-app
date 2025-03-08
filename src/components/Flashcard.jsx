import { useState } from "react";
import "../App.css";

export default function Flashcard({ card }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="flashcard-container" onClick={() => setFlipped(!flipped)}>
      <div className={`flashcard ${flipped ? "flipped" : ""}`}>
        
        {/* Front Side (Question) */}
        <div className="flashcard-face front">
          <p>{card.question}</p>
        </div>

        {/* Back Side (Answer & Image) */}
        <div className="flashcard-face back">
          <p>{card.answer}</p>
          <img src={card.image} alt="Mexican History" className="flag" />
        </div>
        
      </div>
    </div>
  );
}