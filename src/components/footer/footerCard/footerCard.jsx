
import "./footerCard.css";



function FooterCard({ icon, text }) {
  return (
    <div className="footerCardContainer cursorDefaul my-1">
      <div className="FcardIcon">{icon}</div>
      <div className="FcardPar">
        <p>{text}</p>
      </div>
    </div>
  );
}

export default FooterCard;
