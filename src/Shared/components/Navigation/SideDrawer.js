import React from 'react';
import { CSSTransition } from 'react-transition-group';
import './SideDrawer.css';

const SideDrawer = props => {
    return (
        <CSSTransition
            in={props.show}
            timeout={200}
            classNames="slide-in-left"
            mountOnEnter 
            unmountOnExit>

            <aside className="sidedrawer-container">
                {props.children}

            </aside>


        </CSSTransition>

    )
}

export default SideDrawer;