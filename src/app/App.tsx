import { Main } from "@/pages/main/ui";
import { Profile } from "@/pages/profile/ui";

import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";

import { Navigation } from "@/widgets/navigation/ui";

import { Providers } from "./providers";
import "./styles/main.sass";

const App = () => {
    const [page, setPage] = useState<"main" | "saved" | "profile">("main");

    return (
        <>
            {page === "main" ? <Main /> : page === "saved" ? "" : <Profile />}
            <Navigation page={page} setPage={setPage} />
        </>
    );
};

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Providers>
            <App />
        </Providers>
    </StrictMode>
);
