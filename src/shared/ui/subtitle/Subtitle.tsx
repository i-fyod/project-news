import styles from "./styles.module.sass";

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {
    className?: string;
    children?: React.ReactNode;
}

export function Subtitle({ className, children, ...other }: Props) {
    return <h2 className={`${className ? className : ""} ${styles.subtitle}`} {...other}>{children}</h2>;
}
