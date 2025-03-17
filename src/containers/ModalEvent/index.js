import PropTypes from "prop-types";
import { getMonth } from "../../helpers/Date";
import "./style.scss";

const ModalEvent = ({ event }) => {
  // Check if event.date is a valid date
  const validDate = event.date ? new Date(event.date) : null;
  const formattedDate =
    validDate && !Number.isNaN(validDate.getTime())
      ? `${getMonth(validDate)} ${validDate.getFullYear()}`
      : "Date inconnue";

  return (
    <div className="ModalEvent">
      <div className="ModalEvent__imageContainer">
        <img data-testid="card-image-testid" src={event.cover} alt={event.title} />
      </div>
      <div className="ModalEvent__title">
        <div className="ModalEvent__titleLabel">{event.title}</div>
        <div className="ModalEvent__titlePeriode">{event.periode?.trim() || formattedDate}</div>
      </div>
      <div className="ModalEvent__descriptionContainer">
        <h3>Description</h3>
        <div>{event.description}</div>
      </div>
      <div className="ModalEvent__descriptionContainer">
        <h3>Participants</h3>
        <div>{event.nb_guesses} participants</div>
      </div>
      <div className="ModalEvent__descriptionContainer">
        <h3>Prestations</h3>
        {event.prestations.map((presta) => (
          <div key={presta}>{presta}</div>
        ))}
      </div>
    </div>
  );
};

// ModalEvent Proptypes
ModalEvent.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number.isRequired,
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









