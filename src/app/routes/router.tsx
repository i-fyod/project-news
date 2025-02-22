import { Main } from "@/pages/main/ui";
import { NewsPage } from "@/pages/newsPage/ui";
import { Profile } from "@/pages/profile/ui";
import { Saved } from "@/pages/saved/ui";
import { z } from "zod";

import {
    Navigate,
    Outlet,
    createRootRoute,
    createRoute,
    createRouter,
} from "@tanstack/react-router";

import { Navigation } from "@/widgets/navigation/ui";

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}

const newsSchema = z.object({
    search: z.boolean().default(false),
    page: z.number().default(1),
    category: z
        .enum([
            "All",
            "regional",
            "technology",
            "lifestyle",
            "business",
            "general",
            "programming",
            "science",
            "entertainment",
            "world",
            "sports",
            "finance",
            "academia",
            "politics",
            "health",
            "opinion",
            "food",
            "game",
            "fashion",
            "academic",
            "crap",
            "travel",
            "culture",
            "economy",
            "environment",
            "art",
            "music",
            "notsure",
            "CS",
            "education",
            "redundant",
            "television",
            "commodity",
            "movie",
            "entrepreneur",
            "review",
            "auto",
            "energy",
            "celebrity",
            "medical",
            "gadgets",
            "design",
            "EE",
            "security",
            "mobile",
            "estate",
            "funny",
        ])
        .default("All"),
    keywords: z.string().optional(),
});

const rootRoute = createRootRoute({
    component: () => (
        <>
            <Outlet />
            <Navigation />
        </>
    ),
});

export const newsRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "news",
    validateSearch: newsSchema,
    component: Main,
});

export const newsPostRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "news/$postId",
    component: NewsPage,
});

export const savedRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "saved",
    component: Saved,
});

const profileRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "profile",
    component: Profile,
});

const notFoundRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "*",
    component: () => {
        return <Navigate to="/news" replace />;
    },
});

export const router = createRouter({
    routeTree: rootRoute.addChildren([newsRoute, newsPostRoute, savedRoute, profileRoute, notFoundRoute]),
});
