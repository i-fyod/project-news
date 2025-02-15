import { useSearchStore } from "@/app/store";

import { SearchInput } from "@/features/search/ui";

import { SearchBtn } from "@/shared/ui";

import styles from "./styles.module.sass";

export function Search() {
    const focused = useSearchStore((state) => state.focused);
    const setFocused = useSearchStore((state) => state.setFocused);

    return (
        <form className={`${focused ? styles.active : ""} ${styles.search}`} action="">
            <SearchBtn
                className={focused ? styles.active__btn : ""}
                action={() => {
                    setFocused(!focused);
                }}
                focused={focused}
            />
            <SearchInput className={focused ? styles.active__input : ""} />
        </form>
    );
}
