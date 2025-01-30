import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { CARDCOUNT, SWIPELENGTH } from "../../constants/constants";
import styles from "./NewsGallery.module.sass";
import NewsCard from "../NewsCard/NewsCard";
import { INews } from "../../interfaces";

function NewsGallery({news, display}: {news: INews[]; display: "none" | "block"}) {
    const isMobile = useMediaQuery({ query: "(width < 768px)" });
    const isMiniTablet = useMediaQuery({ query: "(width >= 768px) and (width < 1200px)" });
    const isTablet = useMediaQuery({ query: "(width >= 1200px)" });
    const isLaptop = useMediaQuery({ query: "(width >= 1366px)" });
    const [startX, setStartX] = useState(0);
    const [offset, setOffset] = useState(0);

    const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
        const touch = event.touches[0];
        setStartX(touch.clientX);
    };

    const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
        const touch = event.changedTouches[0];
        const endX = touch.clientX;

        // Рассчитываем длину свайпа по оси X без модуля
        const length = endX - startX;

        moveSlider(length);
    };

    const moveSlider = (length: number) => {
        let move = 0;
        if (length > 0) {
            move = offset + (SWIPELENGTH * Math.ceil(length / 200));
        } else if (length < 0) {
            move = offset - (SWIPELENGTH * Math.ceil(length * -1 / 200));
        }

        if (isLaptop) return;
    
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
    
    useEffect(() => {
        const handleWheel: EventListener = (event: any) => {
            if (!isLaptop) {
                event.preventDefault();
            }
            moveSlider((event as WheelEvent).deltaY / -297);
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
