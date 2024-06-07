import { createPortal } from "react-dom";
import Container from "./Container";

const ContainerWrapper = () => {
  return createPortal(
    <div className="modal-wrapper">
      <Container />
    </div>,
    document.getElementById("portal")
  );
};

export default ContainerWrapper;
