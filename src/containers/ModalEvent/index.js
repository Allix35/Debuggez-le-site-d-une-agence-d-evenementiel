import PropTypes from "prop-types";
import { getMonth } from "../../helpers/Date"; // Using helper to get month
import "./style.scss";

// Component for displaying an event inside the modal
const ModalEvent = ({ event }) => {
  // Checking if each date is a valide date
  const validDate = event.date ? new Date(event.date) : null;
  const formattedDate =
    validDate && !Number.isNaN(validDate.getTime())
      ? `${getMonth(validDate)} ${validDate.getFullYear()}`
      : "Date inconnue"; 

  return (
    <div className="ModalEvent">
      {/* Event cover */}
      <div className="ModalEvent__imageContainer">
        <img data-testid="card-image-testid" src={event.cover} alt={event.title} />
      </div>

      {/* Title and date */}
      <div className="ModalEvent__title">
        <div className="ModalEvent__titleLabel">{event.title}</div>
        <div className="ModalEvent__titlePeriode">
          {/* Displaying date if existing otherwise formattedDate */}
          {event.periode?.trim() || formattedDate}
        </div>
      </div>

      {/* Description */}
      <div className="ModalEvent__descriptionContainer">
        <h3>Description</h3>
        <div>{event.description}</div>
      </div>

      {/* Participants */}
      <div className="ModalEvent__descriptionContainer">
        <h3>Participants</h3>
        <div>{event.nb_guesses} participants</div>
      </div>

      {/* Prestations list */}
      <div className="ModalEvent__descriptionContainer">
        <h3>Prestations</h3>
        {event.prestations.map((presta) => (
          <div key={presta}>{presta}</div> // Key on item
        ))}
      </div>
    </div>
  );
};

// Proptypes
ModalEvent.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number,
    type: PropTypes.string.isRequired,
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]).isRequired,
    title: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    nb_guesses: PropTypes.number.isRequired,
    periode: PropTypes.string, 
    prestations: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default ModalEvent;










