import { useQuery } from "@tanstack/react-query";

import { getCategories } from "../../api/apiNews";
import { CategoriesType } from "../../interfaces";
import styles from "./Categories.module.sass";

interface Props {
    selected: string;
    toSelect: (category: CategoriesType) => void;
}

function Categories({ selected, toSelect }: Props) {
    const { data, isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
        select: (data) => data.categories,
        staleTime: Infinity,
    });

    const categories: CategoriesType[] =
        !isLoading && data ? ["All", ...data] : new Array(45).fill("");

    return categories[0] != "All" ? (
        <div className={`${styles.categories} ${styles.skeleton}`}>
            {categories.map((_) => (
                <button className={styles.categories__item}></button>
            ))}
        </div>
    ) : (
        <div className={styles.categories}>
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={(_) => toSelect(category)}
                    className={
                        category === selected
                            ? `${styles.categories__item} ${styles.categories__item_selected}`
                            : styles.categories__item
                    }>
                    {"#" + category}
                </button>
            ))}
        </div>
    );
}

export default Categories;
