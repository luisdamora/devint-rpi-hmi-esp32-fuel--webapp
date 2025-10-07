import { RouterProvider } from "react-router";
import { UIStoreProvider } from "@/lib/providers/ui-store-provider";
import { router } from "./router/routes";
import "./App.css";

export function App() {
	return (
		<UIStoreProvider
			enableDebug={true}
			onHydrated={() => {
				console.log("✅ UI Store hidratado y listo");
			}}
		>
			<RouterProvider router={router} />
		</UIStoreProvider>
	);
}
