import { createBrowserRouter, Link, Navigate } from "react-router";
import { CloseTurnViewComponent } from "@/components/modules/auth/close-turn-view";
import { LoginViewComponent } from "@/components/modules/auth/login-view";
import { MainMenu } from "@/components/modules/auth/main-menu";

// HMI View Components
import { SplashScreen } from "@/components/modules/auth/splash-screen";
import { PointsView } from "@/components/modules/loyalty/points-view";
import { KeypadViewComponent } from "@/components/modules/sales/keypad-view";
import { PaymentMethods } from "@/components/modules/sales/payment-methods";
import { HMIRoute } from "@/components/routes/HMIRoute";
import { PublicRoute } from "@/components/routes/PublicRoute";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <HMIRoute />,
		children: [
			{
				index: true,
				element: <Navigate to="/splash" replace />,
			},
			{
				path: "splash",
				element: <SplashScreen />,
			},
			{
				path: "menu",
				element: <MainMenu />,
			},
			{
				path: "login",
				element: <LoginViewComponent />,
			},
			{
				path: "keypad",
				element: <KeypadViewComponent />,
			},
			{
				path: "payment",
				element: <PaymentMethods />,
			},
			{
				path: "loyalty",
				element: <PointsView />,
			},
			{
				path: "close-turn",
				element: <CloseTurnViewComponent />,
			},
		],
	},
	{
		path: "*",
		element: (
			<PublicRoute title="Página No Encontrada">
				<div className="text-center">
					<div className="text-6xl mb-4">😕</div>
					<h2 className="text-xl font-semibold mb-2">Página No Encontrada</h2>
					<p className="text-gray-600 mb-6">
						La página que está buscando no existe o ha sido movida.
					</p>
					<Link
						to="/splash"
						className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
					>
						Volver al Inicio
					</Link>
				</div>
			</PublicRoute>
		),
	},
]);
