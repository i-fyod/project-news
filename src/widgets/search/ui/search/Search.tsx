import { newsRoute } from "@/app/routes";

import { SearchInput } from "@/features/search/ui";

import { useUrlParams } from "@/shared/lib";
import { BackIcon, Button, SearchIcon } from "@/shared/ui";

import styles from "./styles.module.sass";

export function Search() {
    const { search: focused } = useUrlParams();
    const navigate = newsRoute.useNavigate();

    return (
        <form className={`${focused ? styles.active : ""} ${styles.search}`} action="">
            <Button
                className={focused ? styles.active__btn : ""}
                onClick={() => {
                    navigate({ search: { search: !focused }, replace: true });
                }}>
                {focused ? <BackIcon /> : <SearchIcon />}
            </Button>
            <SearchInput className={focused ? styles.active__input : ""} />
        </form>
    );
}
