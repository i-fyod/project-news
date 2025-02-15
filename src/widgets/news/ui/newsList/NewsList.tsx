import { useEffect, useRef } from "react";

import { Categories } from "@/entities/categories/ui";
import { NewsItem } from "@/entities/news/ui";

import { useNews } from "@/widgets/news/api";
import { useFilters } from "@/widgets/news/lib";
import { QueryError } from "@/widgets/queryError/@x/news";

import { INews } from "@/shared/types";
import { Circle } from "@/shared/ui";

import styles from "./styles.module.sass";

interface Props {
    keywords?: string;
    visible?: number;
}

export function NewsList({ keywords, visible = 50 }: Props) {
    const categoriesRef = useRef<HTMLDivElement>(null);
    const { filters, changeFilter } = useFilters();

    const { data, isFetching, isError, refetch } = useNews(filters);
    const news: INews[] = !isFetching && data ? data : new Array(visible).fill({});

    useEffect(() => {
        changeFilter("keywords", keywords);
    }, [keywords]);

    return (
        <>
            <Categories
                selected={filters.category}
                toSelect={(category) => changeFilter("category", category)}
                ref={categoriesRef}
            />
            {isError && !isFetching ? (
                <QueryError refetch={() => refetch()}>
                    Oops.. The bear you were looking for is not here. Maybe he went fishing?
                </QueryError>
            ) : (
                <div className={styles.news}>
                    <ul className={styles.news__list}>
                        {news.slice(0, visible).map((item) => (
                            <NewsItem news={item} />
                        ))}
                    </ul>
                </div>
            )}
            {!isFetching && !isError && visible >= 30 ? (
                <ul className={styles.pagination}>
                    {Array.from({ length: 8 }, (_, index) => (
                        <Circle
                            className={styles.pagination__item}
                            key={index}
                            isSelected={index + 1 === filters.pageNumber}
                            onClick={() => {
                                changeFilter("pageNumber", index + 1);
                                setTimeout(() => {
                                    categoriesRef.current?.scrollIntoView({ behavior: "smooth" });
                                }, 50);
                            }}
                        />
                    ))}
                </ul>
            ) : null}
        </>
    );
}
