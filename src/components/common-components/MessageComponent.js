import React, { Fragment } from 'react';

export default function MessageComponent({ modalOpen, modalHeader, popupMsg, closeModal }) {
  const resetModal = () => {
    closeModal();
  };

  return (
    modalOpen && (
      <div className={modalOpen ? 'message-modal active' : 'message-modal'}>
        <div className="message-modal-main popup-main">
          <div className="message-header-part">
            <div className="message-modal-header popup-header">{modalHeader}</div>
          </div>

          <div className="message-modal-content popup-content">
            <div className="popup-content-text">
              <span dangerouslySetInnerHTML={{ __html: popupMsg }} />
            </div>
            <div className="popup-btn">
              <button className="message-btn" type="button" onClick={resetModal}>
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
