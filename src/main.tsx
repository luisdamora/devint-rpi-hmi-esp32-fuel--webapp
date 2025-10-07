import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import App from "./App";
import { router } from "./router/routes";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<App />
		{/* <RouterProvider router={router} /> */}
	</StrictMode>,
);
