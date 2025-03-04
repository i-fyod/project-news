import styles from "./styles.module.sass";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    outline?: boolean;
    children: React.ReactNode;
}

export function Button({ className, outline, children, ...props }: Props) {
    return (
        <button
            className={`${className ? className : ""} ${styles.button} ${outline ? styles.button__outlined : ""}`}
            type="button"
            {...props}>
            {children}
        </button>
    );
}
