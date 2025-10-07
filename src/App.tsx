import { RouterProvider } from "react-router";
import { router } from "./router/routes";
import "./App.css";

export function App() {
	return <RouterProvider router={router} />;
}
