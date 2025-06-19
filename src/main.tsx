import { createRouter } from "@tanstack/react-router";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { routeTree } from "./routeTree.gen.ts";
import "./styles/tailwind.css";
import './common/i18n'
import { enableMocks } from "./mocks/enableMocks.ts";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

if (import.meta.env.DEV) {
	await enableMocks();
}

const rootElement = document.querySelector("#root") as Element;
enableMocks().then(() => {
	if (!rootElement.innerHTML) {
		const root = ReactDOM.createRoot(rootElement);
		root.render(
			<React.StrictMode>
				<React.Suspense fallback="loading">
					<App router={router} />
				</React.Suspense>
			</React.StrictMode>
		);
	}
});
