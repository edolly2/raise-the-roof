import { UNSAFE_createClientRoutesWithHMRRevalidationOptOut } from "react-router-dom";
import "./Modal.css";
import { useEffect } from "react";

const Modal = ({ className, isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("body--no-scroll");
    } else {
      document.body.classList.remove("body--no-scroll");
    }

    // Cleanup on unmount
    return () => document.body.classList.remove("body--no-scroll");
  }, [isOpen]);

  if (!isOpen) return null;
  return (
    <div className={`overlay ${className}`} isOpen={isOpen}>
      {/* <div className={`modal ${className}`}> */}
      <div className="modal">
        <button onClick={onClose}>Close</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
