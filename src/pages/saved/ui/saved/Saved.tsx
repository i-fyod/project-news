import { useNewsStore } from "@/app/store";

import { useEffect } from "react";

import { Link } from "@tanstack/react-router";

import { NewsItem } from "@/entities/news/ui";

import { QueryError } from "@/widgets/queryError/ui";

import { INews } from "@/shared/types";
import { Title } from "@/shared/ui";

import styles from "./styles.module.sass";

export function Saved() {
    const savedNews = localStorage.getItem("news");
    const news: INews[] = savedNews ? JSON.parse(savedNews) : [];
    const { addPost } = useNewsStore();

    useEffect(() => {
        news.forEach((post) => {
            addPost(post);
        });
    }, []);

    return (
        <div className={styles.saved}>
            <div className="container">
                <Title className={styles.saved__title}>Favorite News</Title>
                {news.length > 0 ? (
                    <div className={styles.news}>
                        <ul className={styles.news__list}>
                            {news.map((post) => (
                                <Link to={`/news/$postId`} params={{ postId: post.id }}>
                                    <NewsItem id={post.id} news={post} />
                                </Link>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <QueryError>The bear has no news for you... You can save it first</QueryError>
                )}
            </div>
        </div>
    );
}
