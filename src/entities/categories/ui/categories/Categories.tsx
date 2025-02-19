import { forwardRef } from "react";

import { Link } from "@tanstack/react-router";

import { Subtitle } from "@/shared/ui";

import UseCategories from "@/entities/categories/api";
import styles from "./styles.module.sass";

interface Props {
    selected: string;
}

export const Categories = forwardRef<HTMLDivElement, Props>(({ selected }: Props, ref) => {
    const categories = UseCategories();

    return categories[0] != "All" ? (
        <div className={`${styles.categories} ${styles.skeleton}`} ref={ref}>
            {categories.map((_) => (
                <Subtitle className={styles.categories__item}></Subtitle>
            ))}
        </div>
    ) : (
        <div className={styles.categories} ref={ref}>
            {categories.map((category) => (
                <Link
                    to="/news"
                    search={(prev) => ({
                        ...prev,
                        page: 1,
                        category: category,
                    })}>
                    <Subtitle
                        key={category}
                        className={
                            category === selected
                                ? `${styles.categories__item} ${styles.categories__item_selected}`
                                : styles.categories__item
                        }>
                        {"#" + category}
                    </Subtitle>
                </Link>
            ))}
        </div>
    );
});
