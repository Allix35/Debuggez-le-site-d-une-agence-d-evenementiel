import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // 🔹 Vérifie que "focus" contient bien des événements et trie en ORDRE CROISSANT
  const byDateAsc = data?.focus?.length
    ? [...data.focus]
        .filter((evt) => evt?.date) // 🔹 Vérifie que l'événement a bien une date
        .sort((evtA, evtB) => new Date(evtA.date) - new Date(evtB.date))
    : [];

  // 🔹 Gestion du changement automatique des slides
  useEffect(() => {
    if (byDateAsc.length === 0) return undefined; // ✅ Retourne undefined pour éviter "consistent-return"

    const timer = setTimeout(() => {
      setIndex((prevIndex) => (prevIndex + 1) % byDateAsc.length);
    }, 5000);

    return () => clearTimeout(timer); // ✅ Retourne toujours une fonction de nettoyage
  }, [index, byDateAsc.length]);

  // 🔹 Changement de slide au clic sur un bouton radio
  const handlePaginationClick = (radioIdx) => {
    setIndex(radioIdx);
  };

  // 🔹 Affichage d'un message si aucun événement n'est disponible
  if (byDateAsc.length === 0) {
    return <p className="no-events">Aucun événement à afficher</p>;
  }

  return (
    <div className="SlideCardList">
      {byDateAsc.map((event, idx) => (
        <div
          key={event.id || `slide-${idx}`} // ✅ Utilise l'ID s'il existe, sinon fallback avec index
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

      {/* 🔹 Pagination avec clés uniques corrigées */}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateAsc.map((paginationEvent, radioIdx) => (
            <input
              key={`radio-${paginationEvent.id || radioIdx}`} // ✅ Utilise l'ID s'il existe, sinon fallback avec index
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























