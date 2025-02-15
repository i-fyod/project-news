import { RefetchBtn } from "@/features/refetchBtn/ui";

import { BearLogo, Subtitle } from "@/shared/ui";

import styles from "./styles.module.sass";

interface Props {
    children?: string;
    refetch: () => void;
}

export function QueryError({ children, refetch }: Props) {
    return (
        <div className={styles.error}>
            <BearLogo />
            <Subtitle className={styles.error__text}>
                {children ? children : "Oops.. Something went wrong.."}
            </Subtitle>
            <RefetchBtn refetch={() => refetch()} />
        </div>
    );
}
