import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Providers } from "@/app/providers";
import "./styles/main.sass";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Providers />
    </StrictMode>
);
