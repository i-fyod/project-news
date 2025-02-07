import { createContext } from "react";

export interface IThemes {
    dark: "dark";
    light: "light";
}

export const themes: IThemes = {
    dark: "dark",
    light: "light",
};

export interface IThemeContext {
    theme: "dark" | "light";
    setTheme: (theme: "dark" | "light") => void;
}

export const ThemeContext = createContext<IThemeContext>({
    theme: themes.light,
    setTheme: () => {},
});
