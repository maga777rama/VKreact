import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import { AdaptivityProvider, ConfigProvider } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

const container: HTMLElement | null = document.getElementById("root");
const root = createRoot(container!);
root.render(
    <ConfigProvider>
        <AdaptivityProvider>
            <App />
        </AdaptivityProvider>
    </ConfigProvider>,
);
