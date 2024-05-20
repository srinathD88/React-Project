import { createPortal } from "react-dom";
import Button from "./Button";

const Modal = ({ closeModal, children }) => {
  return createPortal(
    <div className="modal-wrapper">
      <Button text="Close Modal" hadnleClick={closeModal}/>
      {children}
    </div>,
    document.getElementById("portal")
  );
};

export default Modal;