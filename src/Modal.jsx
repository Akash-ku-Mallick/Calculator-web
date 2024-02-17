import React from 'react';

const Modal = ({ isOpen, onClose, onConfirm }) => {
  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal">
          <p>Are you sure you want to clear the history?</p>
          <div className="modal-buttons">
            <button onClick={onConfirm}>Yes</button>
            <button onClick={onClose}>No</button>
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;
