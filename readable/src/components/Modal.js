import React from 'react';
import PropTypes from 'prop-types';

function Modal(props) {
  if(!props.show) {
    return null;
  }

  return (
    <div className="backdrop">
      <div className="modal">
        {props.children}
        <div className="footer">
          <button className='btn-modal' onClick={props.onSubmit}>
            Submit
          </button>
          <button className='btn-modal' onClick={props.onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}


Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};

export default Modal;


