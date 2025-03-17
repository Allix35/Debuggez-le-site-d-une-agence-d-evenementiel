import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date"; 

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false); // Add a state for "pause"

  // Check if "focus" get events 

  const byDateDesc = data?.focus?.length
    ? [...data.focus]
        .filter((evt) => evt?.date) // Check if event get a date
        .sort((evtA, evtB) => new Date(evtB.date) - new Date(evtA.date)) // last to first
    : [];

  // Automatic change of slides

  useEffect(() => {
    if (byDateDesc.length === 0 || isPaused) return undefined; // stop timer if "pause" activ

    const timer = setTimeout(() => {
      setIndex((prevIndex) => (prevIndex + 1) % byDateDesc.length);
    }, 5000);

    return () => clearTimeout(timer); 
  }, [index, byDateDesc.length, isPaused]); // Add "isPaused" as dependencie

  // Display pause with "space" 

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space") {
        setIsPaused((prevPaused) => !prevPaused); 
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Slides change on click
  const handlePaginationClick = (radioIdx) => {
    setIndex(radioIdx);
  };

  if (byDateDesc.length === 0) {
    return <p className="no-events">Aucun événement à afficher</p>;
  }

  return (
    <div className="SlideCardList">
      {byDateDesc.map((event, idx) => (
        <div
          key={event.id || `slide-${idx}`} // Use ID if exist, or else fallback with index
          className={`SlideCard ${index === idx ? "SlideCard--display" : "SlideCard--hide"}`}
        >
          <img src={event.cover} alt={event.title} />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div> 
            </div>
          </div>
        </div>
      ))}

      {/* Pagination with correct unique keys */}
      
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc.map((paginationEvent, radioIdx) => (
            <input
              key={`radio-${paginationEvent.id || radioIdx}`} // Use ID if exist, or else fallback with index
              type="radio"
              name="radio-button-slider"
              checked={index === radioIdx}
              onChange={() => handlePaginationClick(radioIdx)}
              className="radio-button"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;

























