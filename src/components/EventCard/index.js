import PropTypes from "prop-types";
import { getMonth } from "../../helpers/Date";
import "./style.scss";

// EventCard component displaying an event card with img, title, date and label
const EventCard = ({
  imageSrc,
  imageAlt,
  date = new Date(), // Default value
  title,
  label,
  small = false,
  ...props // Other props like onClick
}) => (
  <div
    data-testid="card-testid"
    className={`EventCard${small ? " EventCard--small" : ""}`}
    {...props}
  >
    {/* Image with label */}
    <div className="EventCard__imageContainer">
      <img data-testid="card-image-testid" src={imageSrc} alt={imageAlt} />
      <div className="EventCard__label">{label}</div>
    </div>

    {/* Event title and month */}
    <div className="EventCard__descriptionContainer">
      <div className="EventCard__title">{title}</div>
      <div className="EventCard__month">{getMonth(date)}</div>
    </div>
  </div>
);

// PropTypes
EventCard.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
  date: PropTypes.instanceOf(Date).isRequired,
  title: PropTypes.string.isRequired,
  small: PropTypes.bool,
  label: PropTypes.string.isRequired,
};

export default EventCard;











