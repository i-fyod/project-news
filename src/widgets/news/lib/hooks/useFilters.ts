import { useState } from "react";

import { IFilters } from "@/shared/types";

export function useFilters() {
    const [filters, setFilters] = useState<IFilters>({
        pageSize: 50,
        pageNumber: 1,
        category: "All",
        keywords: "",
    });

    const changeFilter = <K extends keyof IFilters>(key: K, value: IFilters[K]) => {
        if (key === "category" || key === "keywords") {
            setFilters((prev) => {
                return { ...prev, ["pageNumber"]: 1 };
            });
        }
        setFilters((prev) => {
            return { ...prev, [key]: value };
        });
    };

    return { filters, changeFilter };
}
