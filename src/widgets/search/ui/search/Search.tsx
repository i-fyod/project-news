import { newsRoute } from "@/app/routes";

import { SearchInput } from "@/features/search/ui";

import { useUrlParams } from "@/shared/lib";
import { SearchBtn } from "@/shared/ui";

import styles from "./styles.module.sass";

export function Search() {
    const { search: focused } = useUrlParams();
    const navigate = newsRoute.useNavigate();

    return (
        <form className={`${focused ? styles.active : ""} ${styles.search}`} action="">
            <SearchBtn
                className={focused ? styles.active__btn : ""}
                action={() => {
                    navigate({ search: { search: !focused }, replace: true });
                }}
                focused={focused}
            />
            <SearchInput className={focused ? styles.active__input : ""} />
        </form>
    );
}
