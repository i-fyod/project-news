import { useQuery } from "@tanstack/react-query";

import { getLatestNews } from "@/shared/api";

export function useLatestNews() {
    const query = useQuery({
        queryKey: ["latestNews"],
        queryFn: getLatestNews,
        select: (data) => data.news,
        refetchInterval: 300000,
    });
    return query;
}
