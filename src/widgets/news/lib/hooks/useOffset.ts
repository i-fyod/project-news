import { useEffect, useState } from "react";

import { useResolution } from "@/shared/lib";

interface Props {
    cardCount: number;
    sliderClass: string;
}

export function useOffset({ cardCount, sliderClass }: Props) {
    const swipeLength = 27 + 2; // cardWidth + gap

    const { isMobile, isMiniTablet, isTablet, isLaptop } = useResolution();

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
            move = offset + swipeLength * Math.ceil(length / 200);
        } else if (length < 0) {
            move = offset - swipeLength * Math.ceil((length * -1) / 200);
        }

        if (isLaptop) return;

        if (move <= 0) {
            if (isMobile && -1 * swipeLength * cardCount < move) {
                setOffset(move);
            } else if (isMiniTablet && -1 * swipeLength * (cardCount - 1) < move) {
                setOffset(move);
            } else if (isTablet && -1 * swipeLength * (cardCount - 2) < move) {
                setOffset(move);
            }
        }
    };

    useEffect(() => {
        const handleWheel: EventListener = (event: any) => {
            if (!isLaptop) {
                event.preventDefault();
            }
            moveSlider((event as WheelEvent).deltaY / -297);
        };

        const slider = document.getElementsByClassName(sliderClass)[0];
        slider.addEventListener("wheel", handleWheel, { passive: false });

        return () => {
            slider.removeEventListener("wheel", handleWheel);
        };
    }, [offset]);

    return { offset, handleTouchStart, handleTouchEnd };
}
