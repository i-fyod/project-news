import { newsRoute } from "@/app/routes";

import { useEffect, useRef, useState } from "react";

import { useDebounce, useUrlParams } from "@/shared/lib";

import styles from "./styles.module.sass";

interface Props {
    className?: string;
}

export function SearchInput({ className }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);
    const { search: focused } = useUrlParams();
    const [keywords, setKeywords] = useState("");
    const navigate = newsRoute.useNavigate();
    const debounceKeywords = useDebounce(keywords, 1000);

    useEffect(() => {
        if (focused) {
            inputRef.current?.focus();
        } else {
            inputRef.current!.value = "";
            setKeywords("");
            navigate({ search: { search: false }, replace: true });
        }
    }, [focused]);

    useEffect(() => {
        if (debounceKeywords != "") {
            navigate({
                search: (prev) => ({
                    ...prev,
                    page: 1,
                    category: "All",
                    keywords: debounceKeywords,
                }),
            });
        }
    }, [debounceKeywords]);

    return (
        <input
            className={`${className ? className : ""} ${styles.searchInput}`}
            type="text"
            placeholder="Search for article..."
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            ref={inputRef}
            onFocus={() =>
                navigate({
                    search: (prev) => ({
                        ...prev,
                        search: true,
                        keywords: debounceKeywords,
                    }),
                })
            }
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                    inputRef.current?.blur();
                } else if (e.key === "Escape") {
                    e.preventDefault();
                    navigate({ search: { search: false }, replace: true });
                    inputRef.current?.blur();
                }
            }}
        />
    );
}
