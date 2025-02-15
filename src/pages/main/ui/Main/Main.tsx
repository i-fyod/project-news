import { useSearchStore } from "@/app/store";
import { formatDate } from "@/pages/main/lib";

import { useState } from "react";

import { UserInfo } from "@/entities/user/ui";

import { Preview } from "@/features/preview/ui";

import { NewsGallery, NewsList } from "@/widgets/news/ui";
import { Search } from "@/widgets/search/ui";

import { useResolution } from "@/shared/lib";
import { Title } from "@/shared/ui";

import styles from "./styles.module.sass";

export function Main() {
    const { isLaptop } = useResolution();
    const [newsCount, setNewsCount] = useState(isLaptop ? 2 : 1);
    const focused = useSearchStore((state) => state.focused);
    const debounceKeywords = useSearchStore((state) => state.debounceKeywords);

    return (
        <div className={styles.mainPage}>
            <div className={`container ${styles.mainPage__header}`}>
                <UserInfo
                    hidden={focused}
                    title="Welcome back!"
                    subtitle={formatDate(new Date())}
                />
                <search className={focused ? styles.search : ""} role="search">
                    <Search />
                    {!!debounceKeywords && focused ? (
                        <div className={styles.search__answer}>
                            <NewsList keywords={debounceKeywords} />
                        </div>
                    ) : null}
                </search>
            </div>
            <NewsGallery />
            <div style={focused ? { visibility: "hidden" } : {}} className="container">
                <div className={styles.mainPage__section}>
                    <Title>News For You</Title>
                    <Preview
                        isVisible={newsCount === 30}
                        setVisible={(bool) => {
                            setNewsCount(bool ? 30 : isLaptop ? 2 : 1);
                        }}
                    />
                </div>
                <NewsList visible={newsCount} />
            </div>
        </div>
    );
}
