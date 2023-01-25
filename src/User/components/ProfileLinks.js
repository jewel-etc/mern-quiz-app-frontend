import React, { useContext } from 'react';
import { AuthContext } from '../../Shared/components/Context/auth-context';
import { NavLink } from 'react-router-dom';
import './ProfileLinks.css';

const ProfileLinks = props => {
    const auth = useContext(AuthContext);
    let rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');

    let initials = [...auth.name.matchAll(rgx)] || [];

    initials = (
        (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
    ).toUpperCase();
    return (
        <div className="profile-side-menu">
            <div className="name-container">

                <div className="name-initial-conatiner">
                    {initials}
                </div>

                <div className="name">
                    {auth.name &&  auth.name.length > 30
                        ? auth.name.substring(0, 30) + '...'
                        : auth.name
                    }
                  
                </div>
            </div>


            <div className="profile-nav-links-container">

                <div className="view-edit-profile-link-container">
                    <NavLink to="/profile">Profile</NavLink>
                </div>

                <div className="change-password-link-container">
                    <NavLink to="/changePassword">Change Password</NavLink>
                </div>
            </div>

        </div>


    )
}

export default ProfileLinks;