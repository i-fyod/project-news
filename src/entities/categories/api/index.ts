import { useQuery } from "@tanstack/react-query";

import { getCategories } from "@/shared/api";
import { CategoriesType } from "@/shared/types";

export default function UseCategories(): CategoriesType[] {
    const { data, isLoading } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategories,
        select: (data) => data.categories,
        staleTime: Infinity,
    });
    return !isLoading && data ? ["All", ...data] : new Array(45).fill("");
}
