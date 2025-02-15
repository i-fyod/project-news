import { forwardRef } from "react";

import { CategoriesType } from "@/shared/types";
import { Subtitle } from "@/shared/ui";

import UseCategories from "../../api";
import styles from "./styles.module.sass";

interface Props {
    selected: string;
    toSelect: (category: CategoriesType) => void;
}

export const Categories = forwardRef<HTMLDivElement, Props>(
    ({ selected, toSelect }: Props, ref) => {
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
                    <Subtitle
                        key={category}
                        onClick={() => toSelect(category)}
                        className={
                            category === selected
                                ? `${styles.categories__item} ${styles.categories__item_selected}`
                                : styles.categories__item
                        }>
                        {"#" + category}
                    </Subtitle>
                ))}
            </div>
        );
    }
);
