import { createContext } from "react";

export interface IThemes {
    dark: "dark";
    light: "light"
};

export const themes: IThemes = {
    dark: "dark",
    light: "light"
};

export const ThemeContext = createContext({})