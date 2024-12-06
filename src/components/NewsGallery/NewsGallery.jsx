import React, { useState, useEffect } from "react";
import styles from "./NewsGallery.module.sass";
import NewsCard from "../NewsCard/NewsCard";
import { getNews } from "../../api/apiNews";

function NewsGallery() {
    const [startX, setStartX] = useState(0);
    const [offset, setOffset] = useState(0);
    const [news, setNews] = useState([]);

    const fetchNews = async () => {
        try {
            const response = await getNews({});
            setNews(response.news.slice(0, 5));
        } catch(error) {
            console.log(error)
        }
    };

    useEffect(_ => {
        fetchNews();
    }, [])

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
        if (-1 * 27.5 * (news.length - 1) <= move && move <= 0) {
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
                {news.length > 0 ?
                news.map(elem => <NewsCard key={elem.id} news={elem} />) :
                <NewsCard skeleton />}
            </div>
        </div>
    );
}

export default NewsGallery;
