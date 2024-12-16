import React, { useState } from "react";
import { CARDCOUNT, SWIPELENGTH } from "../../constants/constants";
import styles from "./NewsGallery.module.sass";
import NewsCard from "../NewsCard/NewsCard";

function NewsGallery({news, display}) {
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
        if (-1 * SWIPELENGTH * (news.length - 1) <= move && move <= 0) {
            setOffset(move)
        }
    }

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
