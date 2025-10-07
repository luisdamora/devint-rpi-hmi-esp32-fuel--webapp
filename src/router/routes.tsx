import { createBrowserRouter, Link, Navigate } from "react-router";
import { CloseTurnViewComponent } from "@/components/modules/auth/close-turn-view";
import { LoginViewComponent } from "@/components/modules/auth/login-view";
import { MainMenu } from "@/components/modules/auth/main-menu";

// HMI View Components
import { SplashScreen } from "@/components/modules/auth/splash-screen";
import { PointsView } from "@/components/modules/loyalty/points-view";
import { KeypadViewComponent } from "@/components/modules/sales/keypad-view";
import { PaymentMethods } from "@/components/modules/sales/payment-methods";
import { AdminRoute } from "@/components/routes/AdminRoute";
import { HMIRoute } from "@/components/routes/HMIRoute";
import { PublicRoute } from "@/components/routes/PublicRoute";

const AdminDashboard = () => (
	<AdminRoute>
		<div>
			<h2 className="text-2xl font-bold mb-6">Panel Administrativo</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<div className="bg-white p-6 rounded-lg border border-gray-200">
					<h3 className="text-lg font-semibold mb-2">Ventas del Día</h3>
					<p className="text-3xl font-bold text-blue-600">$12,450</p>
					<p className="text-sm text-gray-600 mt-2">+15% vs ayer</p>
				</div>
				<div className="bg-white p-6 rounded-lg border border-gray-200">
					<h3 className="text-lg font-semibold mb-2">Transacciones</h3>
					<p className="text-3xl font-bold text-green-600">89</p>
					<p className="text-sm text-gray-600 mt-2">Última hora: 12</p>
				</div>
				<div className="bg-white p-6 rounded-lg border border-gray-200">
					<h3 className="text-lg font-semibold mb-2">Usuarios Activos</h3>
					<p className="text-3xl font-bold text-purple-600">3</p>
					<p className="text-sm text-gray-600 mt-2">Turnos en curso</p>
				</div>
			</div>
		</div>
	</AdminRoute>
);

const SettingsPage = () => (
	<AdminRoute>
		<div>
			<h2 className="text-2xl font-bold mb-6">Configuración del Sistema</h2>
			<div className="space-y-6">
				<div className="bg-white p-6 rounded-lg border border-gray-200">
					<h3 className="text-lg font-semibold mb-4">Configuración General</h3>
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<span>Modo Mantenimiento</span>
							<button
								type="button"
								className="bg-gray-200 relative inline-flex h-6 w-11 items-center rounded-full"
							>
								<span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-1" />
							</button>
						</div>
						<div className="flex items-center justify-between">
							<span>Notificaciones</span>
							<button
								type="button"
								className="bg-blue-600 relative inline-flex h-6 w-11 items-center rounded-full"
							>
								<span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</AdminRoute>
);

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
		path: "/admin",
		element: <AdminDashboard />,
	},
	{
		path: "/settings",
		element: <SettingsPage />,
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
