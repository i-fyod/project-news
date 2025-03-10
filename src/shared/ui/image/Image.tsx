import styles from "./styles.module.sass";

interface Props {
    className?: string;
    src: string;
    color: "#19202D" | "#E5E6E9";
    isSquare?: boolean;
}

export function Image({ className, src, color, isSquare }: Props) {
    return (
        <div
            className={
                isSquare
                    ? `${className ? className : ""} ${styles.imageContainer} ${styles.squareImage}`
                    : `${className ? className : ""} ${styles.imageContainer}`
            }>
            <svg
                className={styles.image}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                        d="M3.28034 2.21968C2.98745 1.92678 2.51257 1.92677 2.21968 2.21966C1.92678 2.51255 1.92677 2.98743 2.21966 3.28032L3.48327 4.54395C3.17684 5.03983 3 5.62427 3 6.25001V17.75C3 19.5449 4.45507 21 6.25 21H17.75C18.3757 21 18.96 20.8232 19.4559 20.5169L20.7194 21.7805C21.0123 22.0734 21.4872 22.0734 21.7801 21.7805C22.073 21.4876 22.073 21.0127 21.7801 20.7198L3.28034 2.21968ZM12.0681 13.1289L18.2739 19.3349C18.2929 19.3572 18.3118 19.3794 18.3305 19.4014C18.1489 19.4653 17.9535 19.5 17.75 19.5H6.25C6.04613 19.5 5.8504 19.4651 5.66845 19.4011L11.4752 13.7148L12.0681 13.1289ZM11.1189 12.1797C10.8678 12.2865 10.6322 12.4409 10.4258 12.643L4.60326 18.3437C4.53643 18.1583 4.5 17.9584 4.5 17.75V6.25001C4.5 6.04371 4.5357 5.84575 4.60125 5.66196L11.1189 12.1797Z"
                        fill={color}></path>{" "}
                    <path
                        d="M19.5 16.3183V6.25001C19.5 5.28351 18.7165 4.50001 17.75 4.50001H7.68194L6.18265 3.00069C6.20505 3.00024 6.2275 3.00001 6.25 3.00001H17.75C19.5449 3.00001 21 4.45508 21 6.25001V17.75C21 17.7726 20.9998 17.7952 20.9993 17.8176L19.5 16.3183Z"
                        fill={color}></path>{" "}
                    <path
                        d="M15.2521 6.50001C16.4959 6.50001 17.5042 7.50832 17.5042 8.75212C17.5042 9.99593 16.4959 11.0042 15.2521 11.0042C14.0083 11.0042 13 9.99593 13 8.75212C13 7.50832 14.0083 6.50001 15.2521 6.50001ZM15.2521 8.00001C14.8367 8.00001 14.5 8.33674 14.5 8.75212C14.5 9.16751 14.8367 9.50424 15.2521 9.50424C15.6675 9.50424 16.0042 9.16751 16.0042 8.75212C16.0042 8.33674 15.6675 8.00001 15.2521 8.00001Z"
                        fill={color}></path>{" "}
                </g>
            </svg>
            {src !== "None" ? <img src={src} alt="" className={styles.image} /> : ""}
        </div>
    );
}
