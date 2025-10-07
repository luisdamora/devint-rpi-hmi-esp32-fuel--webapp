import { createBrowserRouter, Navigate, Link } from "react-router";
import { HMIRoute } from "@/components/routes/HMIRoute";
import { AdminRoute } from "@/components/routes/AdminRoute";
import { PublicRoute } from "@/components/routes/PublicRoute";

// Páginas de ejemplo (se pueden crear después si es necesario)
const HomePage = () => (
	<PublicRoute title="Bienvenido a Nexus POS">
		<div className="text-center">
			<h2 className="text-xl font-semibold mb-4">Seleccione una opción</h2>
			<div className="space-y-3">
				<Link
					to="/hmi"
					className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors text-center"
				>
					🚱 Iniciar Sistema HMI
				</Link>
				<Link
					to="/admin"
					className="block w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg transition-colors text-center"
				>
					⚙️ Panel Administrativo
				</Link>
			</div>
		</div>
	</PublicRoute>
);

const LoginPage = () => (
	<PublicRoute title="Iniciar Sesión">
		<form className="space-y-4">
			<div>
				<label className="block text-sm font-medium text-gray-700 mb-1">
					Usuario
				</label>
				<input
					type="text"
					className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					placeholder="Ingrese su usuario"
				/>
			</div>
			<div>
				<label className="block text-sm font-medium text-gray-700 mb-1">
					Contraseña
				</label>
				<input
					type="password"
					className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
					placeholder="Ingrese su contraseña"
				/>
			</div>
			<button
				type="submit"
				className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
			>
				Iniciar Sesión
			</button>
		</form>
	</PublicRoute>
);

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
							<button className="bg-gray-200 relative inline-flex h-6 w-11 items-center rounded-full">
								<span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-1"></span>
							</button>
						</div>
						<div className="flex items-center justify-between">
							<span>Notificaciones</span>
							<button className="bg-blue-600 relative inline-flex h-6 w-11 items-center rounded-full">
								<span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6"></span>
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
		element: <Navigate to="/home" replace />,
	},
	{
		path: "/home",
		element: <HomePage />,
	},
	{
		path: "/login",
		element: <LoginPage />,
	},
	{
		path: "/hmi",
		element: <HMIRoute />,
		children: [
			{
				path: "splash",
				element: <HMIRoute initialView="splash-screen" />,
			},
			{
				path: "menu",
				element: <HMIRoute initialView="main-menu" />,
			},
			{
				path: "login",
				element: <HMIRoute initialView="login" />,
			},
			{
				path: "keypad",
				element: <HMIRoute initialView="keypad" />,
			},
			{
				path: "payment",
				element: <HMIRoute initialView="payment-methods" />,
			},
			{
				path: "loyalty",
				element: <HMIRoute initialView="loyalty" />,
			},
			{
				path: "close-turn",
				element: <HMIRoute initialView="close-turn" />,
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
						to="/home"
						className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
					>
						Volver al Inicio
					</Link>
				</div>
			</PublicRoute>
		),
	},
]);
