
import React, { useState, useEffect,useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import { FaPlayCircle } from 'react-icons/fa';
import './Pagination.css';

const Paginate = (props) => {


    const [currentPage, setCurrentPage] = useState(1);

    const [postsPerPage, setPostsPerPage] = useState(
        window.innerWidth > 800 ? 4
            : window.innerWidth > 600 && window.innerWidth <= 800 ? 3
                : window.innerWidth > 400 && window.innerWidth <= 600 ? 2 : 1);

 

    const history = useHistory();
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    let currentSavedSubjects;
    const [small, setSmall] = useState();
    const [isLarge, setIsLarge] = useState(window.innerWidth>800);
    const [isMedium, setIsMedium] = useState(window.innerWidth > 600 && window.innerWidth <= 800);
    const [isTab, setIsTab] = useState(window.innerWidth > 400 && window.innerWidth <= 600);
    const [isMobile, setIsMobile] = useState(window.innerWidth > 0 && window.innerWidth <= 400);

    const callback = useCallback(() => {
        const islarge = window.innerWidth > 800;
        const ismedium = window.innerWidth > 600 && window.innerWidth <= 800;
        const istab = window.innerWidth > 400 && window.innerWidth <= 600;
        const ismobile = window.innerWidth > 0 && window.innerWidth <= 400;

        if (islarge) {
            setPostsPerPage(4);
            setIsLarge(true);
            setIsMedium(false);
            setIsTab(false);
            setIsMobile(false);
        }

        if (ismedium) {
            setPostsPerPage(3);
            setIsLarge(false);
            setIsMedium(true);
            setIsTab(false);
            setIsMobile(false);

        }


        if (istab) {
            setPostsPerPage(2)
            setIsLarge(false);
            setIsMedium(false);
            setIsTab(true);
            setIsMobile(false);
        }
        if (ismobile) {
            setPostsPerPage(1)
            setIsLarge(false);
            setIsMedium(false);
            setIsTab(false)
            setIsMobile(true)
            setSmall('small')
        }
       
       
       
    }, [])


    useEffect(() => {

        window.addEventListener("resize",callback);
        return () => window.removeEventListener("resize", callback);
    }, [callback]);


    if (props.loadedSavedSubjects) {
        currentSavedSubjects = props.loadedSavedSubjects.slice(indexOfFirstPost, indexOfLastPost);

    }
    let pageNumber = [];

    for (let i = 1; i <= Math.ceil(props.loadedSavedSubjects.length / postsPerPage); i++) {
        pageNumber.push(i)

    }



    const goToSubjectHandler = (subId) => {
       
        history.push("/getTopics", {
            subId,

        })
    }

    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    let style;

    if (currentSavedSubjects.length>=1 && currentSavedSubjects.length<=3 && isLarge) {
        style = {
            width: '20%'
        }

    }else if(currentSavedSubjects.length===4 && isLarge){
        style={
            width:'30%'
        }
    }else if(currentSavedSubjects.length>=1 && currentSavedSubjects.length<=2 && isMedium){
       
        style={
            width:'30%'
        }

    }else if(currentSavedSubjects.length===3 && isMedium){
       
        style={
            width:'100%'
        }
    }else if(currentSavedSubjects.length===1 &&  isTab){
        style={
            width:'50%'
        }

    }else if(currentSavedSubjects.length===2 && isTab){
        style={
            width:'100%'
        }
    }else if(isMobile){
        style={
            width:'100%'
        }
    }


    return (
        <div className="user-saved-subjects-pagination-container">

            <div className="user-saved-subjects-container" >
                {
                    currentSavedSubjects.map((sub, index) => {
                        return (
                            <div
                                key={sub.id}
                                className="user-saved-subjects"                               
                                style={style}



                                onClick={() => { goToSubjectHandler(sub.id) }}>
                                <div className="user-subject-name-container">

                                    {sub.name.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}


                                </div>
                                <div className="play-container">
                                    <FaPlayCircle />
                                </div>

                            </div>
                        )
                    })
                }

            </div>


            <div className="pagination">

                <Stack spacing={1}>

                    <Pagination
                        size={small && small}
                        color="primary"
                        count={pageNumber.length}
                        page={currentPage}
                        onChange={handleChange} />
                </Stack>
            </div>
        </div>

    )
}

export default Paginate;