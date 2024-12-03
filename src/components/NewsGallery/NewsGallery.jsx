import React, { useState } from "react";
import styles from "./NewsGallery.module.sass";
import NewsCard from "../NewsCard/NewsCard";

function NewsGallery() {
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
            move = offset + (27.5 * Math.ceil(length / 200));
        } else if (length < 0) {
            move = offset - (27.5 * Math.ceil(length * -1 / 200));
        }
        console.log(move)
        if (-1 * 27.5 * 2 <= move && move <= 0) {
            console.log("Я тут")
            setOffset(move)
        }
    }

    return (
        <div
            className={styles.slider}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <div className={styles.slider__content} style={{transform: `translateX(${offset}rem)`}}>
                <NewsCard />
                <NewsCard />
                <NewsCard />
            </div>
        </div>
    );
}

export default NewsGallery;
