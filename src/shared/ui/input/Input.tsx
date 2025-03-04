import styles from "./styles.module.sass";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    placeholder: string;
}

export function Input({ className, placeholder, ...props }: Props) {
    return (
        <div className={styles.inputContainer}>
            <input
                className={`${className ? className : ""} ${styles.input}`}
                type="text"
                placeholder={placeholder}
                onClick={(e) => {
                    e.stopPropagation();
                }}
                {...props}
            />
        </div>
    );
}
