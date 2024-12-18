import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { CARDCOUNT, SWIPELENGTH } from "../../constants/constants";
import styles from "./NewsGallery.module.sass";
import NewsCard from "../NewsCard/NewsCard";

function NewsGallery({news, display}) {
    const isMobile = useMediaQuery({ query: "(width < 768px)" });
    const isMiniTablet = useMediaQuery({ query: "(width >= 768px) and (width < 1200px)" });
    const isTablet = useMediaQuery({ query: "(width >= 1200px)" });
    const [startX, setStartX] = useState(0);
    const [offset, setOffset] = useState(0);

    const handleTouchStart = (event) => {
        const touch = event.touches[0];
        setStartX(touch.clientX);
    };

    const handleTouchEnd = (event) => {
        const touch = event.changedTouches[0];
        const endX = touch.clientX;

        // Рассчитываем длину свайпа по оси X без модуля
        const length = endX - startX;

        moveSlider(length);
    };

    const moveSlider = (length) => {
        let move = 0;
        if (length > 0) {
            move = offset + (SWIPELENGTH * Math.ceil(length / 200));
        } else if (length < 0) {
            move = offset - (SWIPELENGTH * Math.ceil(length * -1 / 200));
        }
        if (move <= 0) {
            if (isMobile && -1 * SWIPELENGTH * CARDCOUNT < move) {
                setOffset(move);
            } else if (isMiniTablet && -1 * SWIPELENGTH * (CARDCOUNT - 1) < move) {
                setOffset(move);
            } else if (isTablet && -1 * SWIPELENGTH * (CARDCOUNT - 2) < move) {
                setOffset(move);
            }
        }
    }
    
    useEffect(_ => {
        const handleWheel = event => {
            event.preventDefault();
            moveSlider(event.deltaY / -297);
        };

        const slider = document.getElementsByClassName(styles.slider)[0];
        slider.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            slider.removeEventListener('wheel', handleWheel);
        };
    }, [offset])

    return (
        <div
            style={{display: display}}
            className={styles.slider}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <div className={styles.slider__content} style={{ transform: `translateX(${offset}rem)` }}>
                {news.length > 0 ?
                    news.slice(0, CARDCOUNT).map(elem => <NewsCard key={elem.id} news={elem} />) :
                    <NewsCard skeleton />}
            </div>
        </div>
    );
}

export default NewsGallery;
