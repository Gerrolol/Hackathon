import React from 'react';

interface RestartModalProps {
  handleRestart: () => void;
  closeModal: () => void;
}

const RestartModal: React.FC<RestartModalProps> = ({ handleRestart, closeModal }) => {
  return (
    <div className="overlay" onClick={closeModal}>
      <div className="modal" onClick = {(e)=> {e.stopPropagation()}}>
        <h2>Are you sure you want to restart?</h2>
        <div className="buttons">
          <button className="cancel-button" onClick={closeModal}>Cancel</button>
          <button className="restart-button" onClick={handleRestart}>Restart</button>
        </div>
      </div>
    </div>
  );
};

export default RestartModal;
