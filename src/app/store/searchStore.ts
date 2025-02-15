import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface SearchState {
    keywords: string;
    setKeywords: (value: string) => void;
    debounceKeywords: string;
    setDebounceKeywords: (value: string) => void;
    focused: boolean;
    setFocused: (value: boolean) => void;
}

export const useSearchStore = create(devtools<SearchState>((set) => ({
    keywords: "",
    setKeywords: (value) => set({ keywords: value }),
    debounceKeywords: "",
    setDebounceKeywords: (value) => set({ debounceKeywords: value }),
    focused: false,
    setFocused: (value) => set({ focused: value }),
})));
