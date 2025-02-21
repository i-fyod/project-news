import { useNewsStore } from "@/app/store";

import { useNavigate } from "@tanstack/react-router";

import { NewsCard } from "@/entities/news/ui";

import { useLatestNews } from "@/widgets/news/api";
import { useOffset } from "@/widgets/news/lib";
import { QueryError } from "@/widgets/queryError/@x/news";

import { useUrlParams } from "@/shared/lib";
import { INews } from "@/shared/types";

import styles from "./styles.module.sass";

interface Props {
    visible?: number;
}

export function NewsGallery({ visible = 10 }: Props) {
    document.documentElement.style.setProperty("--card-count", visible.toString());

    const { addPost } = useNewsStore();
    const navigate = useNavigate();

    const { data, isLoading, isFetching, isError, refetch } = useLatestNews();
    const news: INews[] = !isLoading && data ? data : new Array(visible).fill({});

    const { offset, handleTouchStart, handleTouchEnd } = useOffset({
        cardCount: visible,
        sliderClass: styles.slider,
    });

    const { search: focused } = useUrlParams();

    return (
        <div
            style={focused ? { display: "none" } : {}}
            className={styles.slider}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}>
            {isError && !isFetching ? (
                <QueryError refetch={() => refetch()}>
                    Oops.. The bear found fish instead of news. Try again.
                </QueryError>
            ) : (
                <div
                    className={styles.slider__content}
                    style={{ transform: `translateX(${offset}rem)` }}>
                    {news.slice(0, visible).map((elem) => (
                        <NewsCard
                            key={elem.id}
                            news={elem}
                            onClick={() => {
                                addPost(elem);
                                navigate({ to: `/news/${elem.id}` });
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
