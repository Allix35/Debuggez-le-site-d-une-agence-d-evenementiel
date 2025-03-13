import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  if (!data || error) return <div>{error ? "Une erreur est survenue" : "Chargement en cours..."}</div>;

  // Available categories list
  const typeList = [...new Set(data.events.map((event) => event.type))];

  // Get events descr. way
  const filteredEvents = type
  ? data.events
    .filter((event) => event.type === type && event.date)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
  : data.events
    .filter((event) => event.date)
    .sort((a, b) => new Date(b.date) - new Date(a.date)); 


  // Pagination 
  const paginatedEvents = filteredEvents.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);
  const totalPages = Math.ceil(filteredEvents.length / PER_PAGE);

  // ✅ Function to change category
  const changeType = (selectedType) => {
    
    setType(selectedType);
    setCurrentPage(1); // Return to first page
  };

  return (
    <>
      <h3 className="SelectTitle">Catégories</h3>
      <Select
        selection={typeList}
        onChange={changeType} // Filter apply
      />

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

      {/* Display pagination */}
      
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















