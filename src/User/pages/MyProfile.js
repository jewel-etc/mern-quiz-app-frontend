import React from 'react';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import ProfileLinks from '../components/ProfileLinks';
import ViewProfile from '../components/ViewProfile';
import ChangePassword from '../components/ChangePassword';
import './MyProfile.css';

const MyProfile = props => {
    return (
        <div className="profile-main-container">
            <BrowserRouter>
                <ProfileLinks />
               

                    <Switch>

                        <Route path="/profile" component={ViewProfile} exact />

                        <Route path="/changePassword" component={ChangePassword} />
                        <Redirect to="/profile" />


                    </Switch>

               

            </BrowserRouter>

        </div>
    )
}
export default MyProfile;