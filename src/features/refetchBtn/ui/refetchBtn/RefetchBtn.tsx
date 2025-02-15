import styles from "./styles.module.sass";

interface Props {
    refetch: () => void;
}

export function RefetchBtn({ refetch }: Props) {
    return (
        <button
            className={styles.refetchBtn}
            onClick={() => {
                refetch();
            }}>
            Retry
        </button>
    );
}
