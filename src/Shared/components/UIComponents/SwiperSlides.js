import React, { useState, useEffect ,useCallback} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
    Navigation,
    Pagination,
    Mousewheel,
    Keyboard,
    Autoplay
} from 'swiper';

import 'swiper/swiper-bundle.css';
import './SwiperSlides.css';


SwiperCore.use([Navigation, Pagination, Mousewheel, Keyboard, Autoplay]);



const SwiperSlides = props => {

    const [slidesPerView, setSlidesPerView] = useState(
        window.innerWidth >= 1200
            ? 5
            : window.innerWidth >= 900 && window.innerWidth < 1200 ? 4
                : window.innerWidth >= 750 && window.innerWidth < 900 ? 3
                    : window.innerWidth >= 400 && window.innerWidth < 750 ? 2 : 1);



    const callback = useCallback(() => {
        const screenLarge = window.innerWidth >= 1200;

        const screenMedium = window.innerWidth >= 900 && window.innerWidth < 1200

        const screenTabLarge = window.innerWidth >= 750 && window.innerWidth < 900

        const screenTab = window.innerWidth >= 400 && window.innerWidth < 750

        const screenMobile = window.innerWidth < 400


        if (screenLarge) {
            setSlidesPerView(5)
        }
        else if (screenMedium) {
            setSlidesPerView(4)


        } else if (screenTabLarge) {
            setSlidesPerView(3)

        } else if (screenTab) {
            setSlidesPerView(2)

        } else if (screenMobile) {
            setSlidesPerView(1)
        }
       
    }, [])


    useEffect(() => {


        window.addEventListener("resize",callback);
        return () => window.removeEventListener("resize", callback);
    }, [callback]);


    return (
        <>
            <Swiper className="swiper-container"
                navigation={true}
                pagination={true}
                mousewheel={true}
                keyboard={true}
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                spaceBetween={25}
                slidesPerView={slidesPerView}

            >
                {
                    props.loadedItems.map(item => {

                        return (


                            <SwiperSlide
                                key={item.id}
                                className="swiper-slide box-shadow"
                                onClick={() => item.topicIds.length > 0 && props.handleItemDetails(item.id, item.name)}>
                                <div className="item-name-container" >
                                    {item.name.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}

                                </div>

                                <div className="click-des-container"
                                    style={item.topicIds.length === 0 ? {
                                        background: '#ccc',
                                        borderColor: '#ccc',
                                        cursor: 'not-allowed'
                                    } : {}}>
                                    {item.topicIds.length > 0
                                        ? <span style={{
                                            fontSize: 'small',
                                            fontWeight: 'bold',
                                            color: 'green'

                                        }}>
                                            {item.topicIds.length} Topic{item.topicIds.length === 1 ? null : 's'}
                                        </span>
                                        : <span style={{
                                            fontSize: 'small',
                                            fontWeight: 'bold',
                                            color: '#B86566'

                                        }}>
                                            No Topic Added
                                        </span>}
                                </div>
                            </SwiperSlide>


                        )
                    })
                }
            </Swiper>
        </>

    )
}

export default SwiperSlides;

