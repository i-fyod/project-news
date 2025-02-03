import { useContext } from "react";
import styles from "./Switch.module.sass"
import { ThemeContext, IThemeContext } from "../../contexts/ThemeContext";

const Switch = () => {
    const grayColor = "#9397A0";
    const {theme, setTheme} = useContext<IThemeContext>(ThemeContext);
    return (
        <>
            <input
            className={styles.switch__input}
            id="toggler"
            type="checkbox"
            readOnly
            onChange={theme === "light" ? () => setTheme("dark") : () => setTheme("light")}
            checked={theme === "dark"}
            />
            <label className={styles.switch} htmlFor="toggler">
                <svg className={styles.switch__light} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 10H3M3.00006 17L5.00006 15M10 17V19M15 15L17 17M3 3L5 5M17 10H19M14.9999 5L16.9999 3M10 1V3M13 10C13 11.6569 11.6569 13 10 13C8.34315 13 7 11.6569 7 10C7 8.34315 8.34315 7 10 7C11.6569 7 13 8.34315 13 10Z" stroke={theme === "light" ? "#ffffff" : grayColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <svg className={styles.switch__dark} width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.67193 16.7967C0.973422 16.2328 1.55826 15.2239 2.4525 15.1452C8.24184 14.6357 12.0596 8.07548 9.45916 3.00063C9.04852 2.19926 9.58309 1.13003 10.4465 1.38559C14.2438 2.50955 17 5.94173 17 10C17 14.9715 13.1188 19 7.99996 19C5.65958 19 3.38076 18.1762 1.67193 16.7967Z" stroke={theme === "dark" ? "#232323" : grayColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </label>
        </>
    )
}

export default Switch;