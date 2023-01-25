import React, { useContext, useState} from 'react';
import { NavLink } from 'react-router-dom';
import { FaAngleDown } from "react-icons/fa";
import { AuthContext } from '../Context/auth-context.js';
import MyFavCount from './MyFavCount.js';
import './NavLinks.css';

const NavLinks = props => {

    const auth = useContext(AuthContext);
    const [openDropdown, setOpenDropdown] = useState(false);
    
    let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');

    let initials;


    if (auth.name) {

        initials = [...auth.name.matchAll(rgx)] || [];
        initials = (
            (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
        ).toUpperCase();


    }


    const openAuthHandler = () => {
        props.openAuthHandler()
    }

    const closeAuthHandler = () => {
        props.closeAuthHandler();

    }

    const openDropdownHandler = () => {

        setOpenDropdown(true)

    }

    const openCloseDropdownHandler = () => {

        setOpenDropdown(prevState => !prevState)

    }

    const closeDropdownHandler = () => {
        setOpenDropdown(false)
    }


    return (
        <ul className="nav-links">


            <li className="home" onClick={props.handleSidedrawer}><NavLink to="/" exact>Home</NavLink></li>



            {auth.isLoggedIn && auth.isAdmin &&
                <li
                    className={props.openDropdown ? 'sidedrawer-dropdown-menu-container' : 'dropdown-menu-container'}
                    onMouseEnter={props.openDropdown ? null : openDropdownHandler}
                    onClick={props.openDropdown && openCloseDropdownHandler}
                    onMouseLeave={props.openDropdown ? null : closeDropdownHandler}
                    style={{ height: openDropdown && props.openDropdown ? '160px' : '' }}
                >
                    <div style={{ paddingLeft: '5px' }}>Add</div>
                    <div>
                        <FaAngleDown style={openDropdown ? { transform: 'rotate(180deg)' } : {}} />
                    </div>



                    {openDropdown && <ul className="dropdown-menu box-shadow"  >
                        <li onClick={props.handleSidedrawer}><NavLink to="/mySubjects">My Subject </NavLink></li>
                        <li onClick={props.handleSidedrawer}><NavLink to="/myTopics">My Topics</NavLink></li>
                        <li onClick={props.handleSidedrawer}><NavLink to="/myUnits">My Units</NavLink></li>
                        <li onClick={props.handleSidedrawer}><NavLink to="/myQuesAns">My QuesAns</NavLink></li>
                    </ul>}
                </li>}



            {auth.isLoggedIn &&
                <li
                    className="my-learning"
                    onClick={props.handleSidedrawer}><NavLink to="/myLearning">My Learning</NavLink>
                </li>
            }



            <li onClick={props.handleSidedrawer} ><NavLink to="/about" exact>About</NavLink></li>
          

            <MyFavCount
                token={auth.token}
                favSubjectsIds={auth.favSubjectsIds} />



            {
                !auth.isLoggedIn && <div
                    className="main-menu-login-container"
                    onClick={openAuthHandler}>
                    Authenticate
                </div>
            }


            {
                auth.isLoggedIn &&
                <div className="main-profile-menu-container">
                    <li className="dropdown-menu-container" >
                        <div
                            className="main-profile-menu-initial"
                            onMouseEnter={props.openDropdown ? null : openDropdownHandler}
                            onClick={props.openDropdown && openCloseDropdownHandler}
                            onMouseLeave={props.openDropdown ? null : closeDropdownHandler}
                        >
                            {initials}
                            <div>
                                <FaAngleDown style={openDropdown ? { transform: 'rotate(180deg)' } : {}} />
                            </div>
                        </div>

                        <ul className="dropdown-menu box-shadow"
                            style={{
                                top: '.04rem',
                                right: '5rem'
                            }}>
                            <li className="main-profile-menu-name" style={{ borderBottom: '1px solid black' }} >
                                Hi,  {auth.name.length > 30
                                    ? auth.name.substring(0, 30) + '...'
                                    : auth.name
                                }
                            </li>
                            <li style={{ width: '100%' }}><NavLink to="/myProfile">My Profile </NavLink></li>
                            <li style={{ width: '100%' }}><NavLink to="/myLearning">My Learning</NavLink></li>
                            <li
                                className="main-profile-menu-logout"
                                onClick={() => { auth.logout(); closeAuthHandler() }}>
                                Logout
                            </li>

                        </ul>
                    </li>
                </div>
            }
        </ul>
    )

}

export default NavLinks;