import React from 'react';
import './Button.css';

const Button = props => {

  return (
    <button
      className={`
      button button--${props.size || 'default'} 
      ${props.inverse && 'button--inverse'} 
      ${props.danger && 'button--danger'} 
        ${props.update && 'button--update'} 
        ${props.ok && 'ok--button'} 
        ${props.show && 'show--button'}
        ${props.reset && 'reset--button'}        
        ${props.cancel && 'cancel--button'}
        ${props.add && 'add--button'}
        ${props.enter && 'enter--button'}
        ${props.addToFav && 'addToFav--button'}
        ${props.saveToPro && 'saveToPro--button'}
        ${props.goToFav && 'goToFav--button'}
        ${props.goToSub && 'goToSub--button'}
        `}


      style={props.style}

      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
