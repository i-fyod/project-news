import { useQuery } from "@tanstack/react-query";

import { getNews } from "@/shared/api";
import { IFilters } from "@/shared/types";

export function useNews(filters?: IFilters) {
    const query = useQuery(
        filters?.keywords
            ? {
                  queryKey: ["search", filters],
                  queryFn: () => getNews(filters),
                  select: (data) => {
                      if (data.news.length === 0) {
                          throw new Error("No news found for your search filters.");
                      }
                      return data.news;
                  },
                  gcTime: 0,
              }
            : {
                  queryKey: ["news", filters],
                  queryFn: () => getNews(filters),
                  select: (data) => {
                      if (data.news.length === 0) {
                          throw new Error("No news found for your search filters.");
                      }
                      return data.news;
                  },
                  enabled: filters?.keywords !== "",
              }
    );
    return query;
}
