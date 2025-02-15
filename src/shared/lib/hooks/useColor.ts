import { useContext } from "react";

import { IThemeContext, ThemeContext } from "@/shared/lib";
import { blackColor, dark_blackColor } from "@/shared/const";

const getColorByTheme = (theme: "dark" | "light"): "#19202D" | "#E5E6E9" => {
    return theme === "light" ? blackColor : dark_blackColor;
};

export const useColor = (): "#19202D" | "#E5E6E9" => {
    const { theme } = useContext<IThemeContext>(ThemeContext);
    return getColorByTheme(theme);
};
