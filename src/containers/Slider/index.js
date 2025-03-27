import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date"; 

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // Valide events filtered from last one to old one
  const byDateDesc = data?.focus?.length
    ? [...data.focus]
        .filter((evt) => evt?.date) // Checking if each events get a date
        .sort((evtA, evtB) => new Date(evtB.date) - new Date(evtA.date)) // Descending sort
    : [];

  // Automatic slide every 5 sec
  useEffect(() => {
    if (byDateDesc.length === 0) return undefined;

    const timer = setTimeout(() => {
      setIndex((prevIndex) => (prevIndex + 1) % byDateDesc.length);
    }, 5000);

    return () => clearTimeout(timer);
  }, [index, byDateDesc.length]);

  // Manual events change with pagination button
  const handlePaginationClick = (radioIdx) => {
    setIndex(radioIdx);
  };

  // Message if no events
  if (byDateDesc.length === 0) {
    return <p className="no-events">Aucun événement à afficher</p>;
  }

  return (
    <div className="SlideCardList">
      {byDateDesc.map((event, idx) => (
        <div
          // Checking that each slides get a unique key with fallback `slide-idx`
          key={event.id || `slide-${idx}`}
          className={`SlideCard ${index === idx ? "SlideCard--display" : "SlideCard--hide"}`}
        >
          <img src={event.cover} alt={event.title || "Event image"} />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div> 
            </div>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc.map((paginationEvent, radioIdx) => (
            <input
              key={`radio-${paginationEvent.id || radioIdx}`}
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



























