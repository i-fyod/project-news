import { useRef } from "react";

import { Link } from "@tanstack/react-router";

import { Categories } from "@/entities/categories/ui";
import { NewsItem } from "@/entities/news/ui";

import { useNews } from "@/widgets/news/api";
import { QueryError } from "@/widgets/queryError/@x/news";

import { useUrlParams } from "@/shared/lib";
import { INews } from "@/shared/types";
import { Circle } from "@/shared/ui";

import styles from "./styles.module.sass";

interface Props {
    visible?: number;
}

export function NewsList({ visible = 50 }: Props) {
    const categoriesRef = useRef<HTMLDivElement>(null);
    const { page, category, keywords } = useUrlParams();

    const { data, isLoading, isFetching, isError, refetch } = useNews({
        pageSize: 50,
        pageNumber: page,
        category: category,
        keywords: keywords,
    });

    const news: INews[] = !isLoading && data ? data : new Array(visible).fill({});

    return (
        <>
            <Categories selected={category} ref={categoriesRef} />
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
                        <Link
                            className={styles.pagination__item}
                            to="/news"
                            search={(prev) => ({
                                ...prev,
                                page: index + 1,
                            })}>
                            <Circle
                                key={index}
                                isSelected={index + 1 === page}
                                onClick={() => {
                                    setTimeout(() => {
                                        categoriesRef.current?.scrollIntoView({
                                            behavior: "smooth",
                                        });
                                    }, 50);
                                }}
                            />
                        </Link>
                    ))}
                </ul>
            ) : null}
        </>
    );
}
