import React, { useEffect, useState } from 'react';
import { useGetUserByUserId } from '../Hooks/useGetUserByUserId';
import { NavLink } from 'react-router-dom';
import ErrorModal from '../UIComponents/ErrorModal';
import { MdFavorite } from "react-icons/md";


const MyFavCount = props => {

    const [isLoading, error, clearError, fetchUserByUserId, loadedUser] = useGetUserByUserId();
    const [favSubs, setFavSubs] = useState([]);

    useEffect(() => {

        if (props.token) {
            fetchUserByUserId(props.token);

        } else {
            setFavSubs(props.favSubjectsIds)
        }

    }, [props.token, props.favSubjectsIds, fetchUserByUserId])

    useEffect(() => {
        if (loadedUser) {
            setFavSubs(loadedUser.favSubjectsIds)
        }
    }, [loadedUser])
    return (
        <li className="main-menu-my-fav" >
            {error && <ErrorModal onClear={clearError} error={error} />}

            <NavLink to="/myFav" exact >
                <div className="fav">
                    <MdFavorite />
                </div>

                <div className="fav-count-container">
                    <div
                        className="fav-count"
                        
                        style={!isLoading && props.favSubjectsIds && favSubs.length > 0 ? { backgroundColor: 'red' } : {}}
                    >
                        {!isLoading && props.favSubjectsIds &&
                            favSubs.length > 0 && favSubs.length <= 9
                            ? <span> {favSubs.length}</span>
                            :favSubs.length >9 &&  <span>9<sup>+</sup></span>}


                    </div>
                </div>

            </NavLink>


        </li>
    )
}

export default MyFavCount;