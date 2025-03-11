import Button from "../../components/Button";
import Logo from "../../components/Logo";

import "./style.scss";

const scrollToSection = (id) => {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

const Menu = () => (
  <nav>
    <Logo />
    <ul>
      <li>
        <a href="#nos-services" onClick={(e) => { e.preventDefault(); scrollToSection("nos-services"); }}>
          Nos services
        </a>
      </li>
      <li>
        <a href="#nos-realisations" onClick={(e) => { e.preventDefault(); scrollToSection("nos-realisations"); }}>
          Nos réalisations
        </a>
      </li>
      <li>
        <a href="#notre-equipe" onClick={(e) => { e.preventDefault(); scrollToSection("notre-equipe"); }}>
          Notre équipe
        </a>
      </li>
    </ul>
    <Button 
    title="contact" 
    onClick={() => { window.document.location.hash = "#contact"; }}
    >
    Contact
    </Button>
  </nav>
);

export default Menu;



