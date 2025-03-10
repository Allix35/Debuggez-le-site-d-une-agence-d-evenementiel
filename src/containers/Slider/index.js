import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // Trier les événements par date décroissante
  const byDateDesc = data?.focus
    ? [...data.focus].sort((evtA, evtB) => new Date(evtB.date) - new Date(evtA.date))
    : [];

  // Fonction pour passer à l'image suivante
  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prevIndex) => (prevIndex + 1) % byDateDesc.length);
    }, 5000);

    return () => clearTimeout(timer);
  }, [index, byDateDesc.length]);

  if (!byDateDesc.length) {
    return <p>Aucun événement à afficher</p>;
  }

  return (
    <div className="SlideCardList">
      {byDateDesc.map((event, idx) => (
        <div
          key={event.id}
          className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}
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

      {/* Pagination - boutons radio cliquables */}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc.map((paginationEvent, radioIdx) => (
            <input
              key={`radio-${paginationEvent.id}`}
              type="radio"
              name="radio-button-slider"
              checked={index === radioIdx}
              onChange={() => setIndex(radioIdx)} // Permet de changer au clic
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;




















