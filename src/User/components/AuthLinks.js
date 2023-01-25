import React from 'react';
import { NavLink } from 'react-router-dom';


const ProfileLinks = props => {

    return (
        <div className="auth-side-menu">

            <div className="admin-login-container">
                <NavLink
                    activeStyle={{ backgroundColor: 'rgb(105, 55, 245)' }}
                    to="/authAdmin">Admin Login</NavLink>
            </div>

            <div className="user-login-container">
                <NavLink
                    activeStyle={{ backgroundColor: 'rgb(105, 55, 245)' }}
                    to="/authUser">User Login</NavLink>
            </div>

            <div className="signup-container">
                <NavLink
                    activeStyle={{ backgroundColor: 'rgb(105, 55, 245)' }}
                    to="/authSignup">No account? Signup Now</NavLink>
            </div>


        </div>


    )
}

export default ProfileLinks;