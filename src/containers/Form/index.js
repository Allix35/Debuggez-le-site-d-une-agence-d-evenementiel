import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

// API to test form
const mockContactApi = () =>
  new Promise((resolve) => {
    setTimeout(() => resolve("success"), 500); // Positive answer after 500 ms
  });

// Main component form
const Form = ({ onSuccess = () => null, onError = () => null }) => {
  const [sending, setSending] = useState(false);

  // Function executed when form submitted
  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault(); 
      setSending(true); // Active the mode "loading"

      try {
        await mockContactApi(); // API call
        setSending(false);      // End of loading
        onSuccess();            // Call onSuccess function
      } catch (err) {
        setSending(false);      // End of loading
        onError(err);           // Call error function
      }
    },
    [onSuccess, onError] // Functions dependencies
  );

  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          {/* Field */}
          <Field placeholder="" label="Nom" />
          <Field placeholder="" label="Prénom" />
          <Select
            selection={["Personnel", "Entreprise"]}
            onChange={() => null}
            label="Personnel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field placeholder="" label="Email" />

          {/* Button disabled when sending data */}
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>

        <div className="col">
          {/* Text zone */}
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,     // Function call if error
  onSuccess: PropTypes.func,   // Function call if succed
};

export default Form;





