import { useEffect, useState } from "react";
import { themes, ThemeContext } from "../contexts/ThemeContext";
import { ReactNode } from 'react';

const getTheme = (): "dark" | "light" => {
    const theme = `${localStorage.getItem("theme")}`;
    if (Object.values(themes).includes(theme)) return theme as "dark" | "light";

    const userMedia = window.matchMedia('(prefers-color-scheme: light)');
    if (userMedia.matches) return themes.light;

    return themes.dark;
}

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [theme, setTheme] = useState<"dark" | "light">(getTheme);

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        localStorage.setItem("theme", theme);
    }, [theme])

    return (
        <ThemeContext.Provider value={{theme, setTheme}} >
            {children}
        </ThemeContext.Provider>
    )
}