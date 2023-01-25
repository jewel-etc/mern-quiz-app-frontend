import React from 'react';

import { CSSTransition } from 'react-transition-group';

import Backdrop from './Backdrop';
import './Modal.css';

const Modal = props => {
  return (
    <React.Fragment>
      {props.show && <Backdrop cancel={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
      
        <div className={`modal ${props.className}`} style={props.style}>
          <header className={`modal__header ${props.headerClass}`}>
            <h2>{props.header}</h2>
          </header>
        
            <div className={`modal__content ${props.contentClass}`}>
              {props.children}
            </div>
            <footer className={`modal__footer ${props.footerClass}`}>
              {props.footer}
            </footer>
        
        </div>
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;
