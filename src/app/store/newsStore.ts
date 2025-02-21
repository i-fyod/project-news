import { create } from "zustand";

import { INews } from "@/shared/types";

interface INewsStore {
    posts: { [newsId: string]: INews };
    addPost: (post: INews) => void;
}

export const useNewsStore = create<INewsStore>((set) => ({
    posts: {},
    addPost: (post) =>
        set((state) => ({
            posts: { ...state.posts, [post.id]: post },
        })),
}));
