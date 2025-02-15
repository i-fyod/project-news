import { useMediaQuery } from "react-responsive";

export function useResolution() {
    const isMobile = useMediaQuery({ query: "(width < 768px)" });
    const isMiniTablet = useMediaQuery({ query: "(width >= 768px) and (width < 1200px)" });
    const isTablet = useMediaQuery({ query: "(width >= 1200px) and (width < 1366px)" });
    const isLaptop = useMediaQuery({ query: "(width >= 1366px)" });

    return { isMobile, isMiniTablet, isTablet, isLaptop };
}
