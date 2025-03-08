import { useState } from "react";
import Flashcard from "./components/Flashcard";
import "./App.css";

export default function App() {
  const mexicanHistoryFacts = [
    {
      question: "What is the national sport of Mexico?",
      answer: "Charrería, a traditional Mexican rodeo.",
      image: "/images/sport.jpeg"
    },
    {
      question: "What is Mexicos most famous ancient site?",
      answer: "Chichén Itzá, an impressive Mayan city with the iconic El Castillo pyramid.",
      image: "/images/pyramid.jpeg"
    },
    {
      question: "What are the roots of Mexican folk music?",
      answer: "Mexican folk music, like mariachi, draws from indigenous, Spanish, and African influences.",
      image: "/images/mariachi.jpeg"
    },
    {
      question: "How did Mexican muralism impact modern art?",
      answer: "Mexican muralism, led by artists like Diego Rivera, brought social and political themes into public art and inspired movements worldwide.",
      image: "/images/mural.jpeg"
    },
    {
      question: "How has Mexican literature influenced global storytelling?",
      answer: "Mexican writers like Octavio Paz and Juan Rulfo introduced themes of identity, solitude, and surrealism, shaping Latin American literature and beyond.",
      image: "/images/library.jpeg"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  function nextCard() {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % mexicanHistoryFacts.length);
  }

  function prevCard() {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? mexicanHistoryFacts.length - 1 : prevIndex - 1
    );
  }

  return (
    <div className="App">
      <div className="header-box">
        <h1 className="header"> México en Memoria 💌</h1>
        <h2 className="subheader">Put your knowledge of Mexican heritage to the test!</h2>
        <h3 className= "total-cards" id="card-count">Total Cards: {mexicanHistoryFacts.length}</h3>
      </div>

      <Flashcard card={mexicanHistoryFacts[currentIndex]} />

      <div className="button-container">
        <button onClick={prevCard} className="nav-btn">⬅ Back</button>
        <button onClick={nextCard} className="nav-btn">Next ➡</button>
      </div>
    </div>
  );
}
