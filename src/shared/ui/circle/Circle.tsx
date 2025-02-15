import styles from "./styles.module.sass";

interface Props extends React.HTMLAttributes<HTMLLIElement> {
    className?: string;
    isSelected: boolean;
}

export function Circle({ className, isSelected, ...other }: Props) {
    return (
        <li
            className={
                isSelected
                    ? `${className ? className : ""} ${styles.circle} ${styles.circle__selected}`
                    : `${className ? className : ""} ${styles.circle}`
            }
            {...other}></li>
    );
}
