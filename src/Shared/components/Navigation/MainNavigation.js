import React, { useState, useContext } from 'react';
import MainHeader from './MainHeader';
import { NavLink,useHistory } from 'react-router-dom';
import { FaAngleDown } from "react-icons/fa";
import NavLinks from './NavLinks.js';
import MyFavCount from './MyFavCount.js';
import SideDrawer from './SideDrawer.js';
import Backdrop from '../UIComponents/Backdrop.js';
import Auth from '../../../User/pages/Auth.js';
import { AuthContext } from '../Context/auth-context.js';
import logo from '../../../images/logo2.png';


import './MainNavigation.css';

const MainNavigation = props => {

    const auth = useContext(AuthContext);
    const history=useHistory();

    const [showSidedrawer, setShowSidedrawer] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [openAuth, setOpenAuth] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState();
    const [authIsLoading, setAuthIsLoading] = useState();

    const showSidedrawerHandler = () => {

        setShowSidedrawer(true);
        setShowProfileMenu(false)
    }
    const closeSideDrawer = () => {
        setShowSidedrawer(false)

    }
    const showProfileMenuHandler = () => {
        setShowProfileMenu(prevState => !prevState);
    }

    const openAuthHandler = () => {
        setOpenAuth(true);
        setShowSidedrawer(false);

    }

    const closeAuthHandler = () => {
        setOpenAuth(false);
        setIsLoggedIn(false)
    }

    const goHomePage =()=>{
        history.push("/")

    }

    let initials;
    let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');


    if (auth.name) {

        initials = [...auth.name.matchAll(rgx)] || [];
        initials = (
            (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
        ).toUpperCase();


    }

    let sidedrawerProfileContainerstyle, sidedrawerUserNameStyle, dropdownArrowStyle, sidedrawerProfileDropdownMenu;
    if (showProfileMenu) {
        sidedrawerProfileContainerstyle = {
            height: '160px',

            backgroundColor: 'black'
        }

        sidedrawerUserNameStyle = {
            color: 'white'
        }

        dropdownArrowStyle = {
            color: 'white',
            transform: 'rotate(180deg)'

        }

        sidedrawerProfileDropdownMenu = {
            backgroundColor: 'white'
        }


    }

    const handleAuthenticate = (isLoading) => {
        setAuthIsLoading(isLoading)

    }

    return (
        <>
            <MainHeader>
                <button
                    className="main-navigation-menu-btn"
                    onClick={showSidedrawerHandler}>
                    <span />
                    <span />
                    <span />
                    <span />

                </button>

                {
                    openAuth && !auth.isLoggedIn &&
                   

                       

                        <Auth
                            authenticateHandler={handleAuthenticate}
                            isLoggedIn={isLoggedIn} 
                            authIsLoading={authIsLoading}
                            closeAuthHandler={closeAuthHandler}
                            />

                   
                }

                {
                    showSidedrawer && <Backdrop cancel={closeSideDrawer} />
                }

                <SideDrawer show={showSidedrawer}>

                    <nav className="side-drawer-nav-links-container" >

                        {auth.isLoggedIn &&
                            <ul
                                className="sidedrawer-profile-container"
                                onClick={showProfileMenuHandler}

                                style={sidedrawerProfileContainerstyle}>


                                <div className="sidedrawer-user-initial">
                                {initials}
                               
                                </div>
                              

                                <div
                                    className="sidedrawer-user-name"
                                    style={sidedrawerUserNameStyle}>
                                    Hi,  {auth.name.length > 30
                                    ? auth.name.substring(0, 30) + '...'
                                    : auth.name
                                }
                                </div>

                                <div
                                    className="dropdown-arrow"
                                    style={dropdownArrowStyle} >
                                    <FaAngleDown />
                                </div>
                                {
                                    showProfileMenu &&

                                    <ul
                                        className="sidedrawer-profile-dropdown-menu"
                                        style={sidedrawerProfileDropdownMenu}>
                                        <li onClick={closeSideDrawer}><NavLink to="/myProfile">My Profile </NavLink></li>
                                        <li onClick={closeSideDrawer}><NavLink to="/myLearning">My Learning</NavLink></li>
                                        <li onClick={() => { auth.logout(); closeSideDrawer(); closeAuthHandler();goHomePage() }}
                                            style={{ paddingTop: '5px', paddingBottom: '5px' }}>Log out</li>

                                    </ul>
                                }
                            </ul>
                        }

                        {!auth.isLoggedIn &&
                            <>

                                <div
                                    className="main-menu-login-container side-login"
                                    onClick={openAuthHandler}>
                                    Authenticate
                                </div>
                            </>
                        }


                        <NavLinks
                            showSidedrawer={showSidedrawer}
                            handleSidedrawer={closeSideDrawer}
                            openDropdown={true} />

                    </nav>
                </SideDrawer>



                <div className="main-navigation-title">

                    <NavLink to="/">
                        <div className="mcq"> Study</div>
                        <div className="logo">
                            <img src={logo} alt="logo" />
                        </div>

                    </NavLink>
                </div>
                <nav className="nav-links-container">
                    <NavLinks openAuthHandler={openAuthHandler}
                        closeAuthHandler={closeAuthHandler} />
                </nav>

                <ul className="my-fav">
                    <MyFavCount
                        token={auth.token}
                        favSubjectsIds={auth.favSubjectsIds} />
                </ul>


            </MainHeader>
        </>

    )
}

export default MainNavigation;
