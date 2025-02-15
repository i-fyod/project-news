import styles from "./styles.module.sass";

interface Props {
    isVisible: boolean;
    setVisible: (bool: boolean) => void;
}

export function Preview({ isVisible, setVisible }: Props) {
    return (
        <button onClick={() => setVisible(!isVisible)} className={styles.preview}>
            {isVisible ? "Hide" : "View All"}
        </button>
    );
}
