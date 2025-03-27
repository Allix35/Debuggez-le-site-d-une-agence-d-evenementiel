import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

// Number of event per page
const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData(); // Getting data
  const [type, setType] = useState(null); // Events type selected
  const [currentPage, setCurrentPage] = useState(1); // Actual page

  if (!data || error) return <div>{error ? "Une erreur est survenue" : "Chargement en cours..."}</div>;

  // Filters list availables
  const typeList = [...new Set(data.events.map((event) => event.type))];

  // Events filtered in function of categorie selected
  const filteredEvents = type
    ? data.events
        .filter((event) => event.type === type && event.date) // If a category is selected
        .sort((a, b) => new Date(b.date) - new Date(a.date)) // Event are displaying from last to old date
    : data.events
        .filter((event) => event.date) // If no categories are selected
        .sort((a, b) => new Date(b.date) - new Date(a.date)); // Event are displaying from last to old date

  // Paginated Events
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );
  const totalPages = Math.ceil(filteredEvents.length / PER_PAGE);

  // Filters categories update
  const changeType = (selectedType) => {
    setType(selectedType);
    setCurrentPage(1); // Displaying page 1 when categories change
  };

  return (
    <>
      <h3 className="SelectTitle">Catégories</h3>

      {/* Select component to change category */}
      <Select selection={typeList} onChange={changeType} />

      {/* Events displaying */}
      <div id="events" className="ListContainer">
        {paginatedEvents.length > 0 ? (
          paginatedEvents.map((event) => (
            <Modal key={event.id} Content={<ModalEvent event={event} />}>
              {({ setIsOpened }) => (
                <EventCard
                  onClick={() => setIsOpened(true)}
                  imageSrc={event.cover}
                  title={event.title}
                  date={new Date(event.date)}
                  label={event.type}
                />
              )}
            </Modal>
          ))
        ) : (
          <p>Aucun événement disponible pour cette catégorie.</p>
        )}
      </div>

      {/* Pagination if several pages */}
      {totalPages > 1 && (
        <div className="Pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <a key={`page-${index + 1}`} href="#events" onClick={() => setCurrentPage(index + 1)}>
              {index + 1}
            </a>
          ))}
        </div>
      )}
    </>
  );
};

export default EventList;
















