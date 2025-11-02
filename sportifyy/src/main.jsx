import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css"; // <-- make sure Tailwind is imported

// Mount the React app into the DOM (Vite loads this file as a module from index.html)
const container = document.getElementById("root");
if (container) {
    const root = createRoot(container);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
} else {
    // eslint-disable-next-line no-console
    console.error('Root container not found: make sure <div id="root"></div> exists in index.html');
}