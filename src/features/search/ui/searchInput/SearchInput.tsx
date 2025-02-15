import { useSearchStore } from "@/app/store";

import { useEffect, useRef } from "react";

import { useDebounce } from "@/shared/lib";

import styles from "./styles.module.sass";

interface Props {
    className?: string;
}

export function SearchInput({ className }: Props) {
    const inputRef = useRef<HTMLInputElement>(null);
    const focused = useSearchStore((state) => state.focused);
    const setFocused = useSearchStore((state) => state.setFocused);
    const keywords = useSearchStore((state) => state.keywords);
    const setKeywords = useSearchStore((state) => state.setKeywords);
    const debounceKeywords = useDebounce(keywords, 1000);
    const setDebounceKeywords = useSearchStore((state) => state.setDebounceKeywords);

    useEffect(() => {
        if (focused) {
            inputRef.current?.focus();
        } else {
            inputRef.current!.value = "";
            setKeywords("");
        }
    }, [focused]);

    useEffect(() => {
        setDebounceKeywords(debounceKeywords);
    }, [debounceKeywords]);

    return (
        <input
            className={`${className ? className : ""} ${styles.searchInput}`}
            type="text"
            placeholder="Search for article..."
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            ref={inputRef}
            onFocus={() => setFocused(true)}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                    inputRef.current?.blur();
                } else if (e.key === "Escape") {
                    e.preventDefault();
                    setFocused(false);
                    inputRef.current?.blur();
                }
            }}
        />
    );
}
