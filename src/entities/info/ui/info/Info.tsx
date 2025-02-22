import Markdown from "react-markdown";

import changelog from "@/shared/assets/changelog.md?raw";
import { Subtitle } from "@/shared/ui";

import styles from "./styles.module.sass";

interface Props {
    className?: string;
}

export function Info({ className }: Props) {
    return (
        <div className={`${className ? className : ""} ${styles.info}`}>
            <span className={styles.info__changelog}>
                <Markdown>{changelog}</Markdown>
            </span>

            <Subtitle className={styles.info__text}>
                <svg
                    className={styles.info__icon}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_iconCarrier">
                        <path
                            d="M12 17V11"
                            stroke="#9397A0"
                            strokeWidth="2"
                            strokeLinecap="round"></path>
                        <circle
                            cx="1"
                            cy="1"
                            r="1"
                            transform="matrix(1 0 0 -1 11 9)"
                            fill="#9397A0"
                            stroke="#9397A0"
                            strokeWidth="1"></circle>
                        <path
                            d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
                            stroke="#9397A0"
                            strokeWidth="1.5"
                            strokeLinecap="round"></path>
                    </g>
                </svg>
                4.0.3 | by i_fyod
            </Subtitle>
        </div>
    );
}
