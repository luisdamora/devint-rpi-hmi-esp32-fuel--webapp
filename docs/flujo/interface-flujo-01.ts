// ============================================
// INTERFACES DE CONFIGURACIÓN Y USUARIO
// ============================================

interface User {
	id: string;
	username: string;
	password: string;
	role: "vendedor" | "administrador" | "supervisor";
	fullName: string;
}

interface Turn {
	id: string;
	userId: string;
	userName: string;
	startDate: Date;
	endDate?: Date;
	startBalance: number;
	endBalance?: number;
	status: "activo" | "cerrado";
	salesCount: number;
	totalSales: number;
}

interface StationInfo {
	name: string; // "Estacion de Servicio Nexus"
	code: string; // "99999"
	contactEmail: string;
	contactWeb: string;
	phones: string[];
}

// ============================================
// VISTA 1: SPLASH SCREEN
// ============================================

interface SplashScreenView {
	logo: string; // URL del logo Nexus
	version?: string;
	displayDuration: number; // milisegundos
	timestamp: Date;
	contactInfo: {
		email: string;
		website: string;
		phones: string[];
	};
}

// ============================================
// VISTA 2: MENÚ PRINCIPAL
// ============================================

interface MainMenuView {
	header: HeaderInfo;
	menuOptions: MenuOption[];
	turnStatus: TurnStatus;
	sidebar: SidebarButton[];
}

interface HeaderInfo {
	logo: string;
	stationName: string; // "EDS: Estacion de Servicio Nexus"
	stationCode: string; // "CODIGO EDS: 99999"
	timestamp: Date;
	contactInfo: ContactInfo;
}

interface ContactInfo {
	email: string; // "soporte@vpmnexus.com"
	website: string; // "www.vpmnexus.com"
	phones: string[]; // ["+57-3184936241", "+57-3164475985"]
}

interface MenuOption {
	id: string;
	label: string; // 'TURNOS', 'CONTADO', 'CREDITO', 'INICIO', 'FIDELIZACION', 'UTILIDADES'
	icon: string;
	iconType:
		| "calendar"
		| "cash"
		| "credit-card"
		| "home"
		| "loyalty"
		| "settings";
	enabled: boolean;
	borderColor: "red" | "green";
	action: MenuAction;
	position: {
		row: number;
		col: number;
	};
}

type MenuAction =
	| "MANAGE_TURN"
	| "SALE_CASH"
	| "SALE_CREDIT"
	| "HOME"
	| "LOYALTY"
	| "UTILITIES";

interface TurnStatus {
	isActive: boolean;
	currentTurn?: Turn;
	displayColor: "red" | "green";
}

interface SidebarButton {
	id: string;
	icon: string;
	label: string;
	enabled: boolean;
}

// ============================================
// VISTA 3: LOGIN / INICIAR TURNO
// ============================================

interface LoginView {
	header: HeaderInfo;
	sidebarIcon: {
		id: string;
		label: string; // "TURNOS"
		icon: string;
		highlighted: boolean;
	};
	title: string; // "VENDEDOR"
	subtitle: string; // "SEBASTIAN RESTREPO BUSTAMANTE"
	fields: LoginField[];
	action: LoginAction;
}

interface LoginField {
	id: string;
	label: string; // 'USUARIO:', 'CONTRASEÑA:'
	type: "text" | "password";
	value: string;
	placeholder: string; // "***************"
	required: boolean;
	masked: boolean;
}

interface LoginAction {
	label: string; // 'INICIAR'
	type: "submit";
	enabled: boolean;
	backgroundColor: string; // "#EF4444" (rojo)
}

// ============================================
// VISTA 4: MENÚ CON TURNO ACTIVO
// ============================================

interface ActiveTurnMenuView extends MainMenuView {
	// La diferencia principal es que el botón TURNOS tiene borde verde
	// y todas las opciones están habilitadas
}

// ============================================
// VISTA 5: CERRAR TURNO
// ============================================

interface CloseTurnView {
	header: HeaderInfo;
	sidebarIcons: SidebarIcon[];
	title: string; // "VENDEDOR"
	subtitle: string; // "SEBASTIAN RESTREPO BUSTAMANTE"
	fields: LoginField[];
	action: CloseTurnAction;
}

interface SidebarIcon {
	id: string;
	label: string;
	icon: string;
	highlighted: boolean;
	borderColor: "red" | "green";
}

interface CloseTurnAction {
	label: string; // 'CERRAR'
	type: "submit";
	enabled: boolean;
	backgroundColor: string; // "#22C55E" (verde)
}

// ============================================
// VISTA 6: TECLADO NUMÉRICO (CONTADO/CRÉDITO)
// ============================================

interface KeypadView {
	header: HeaderInfo;
	sidebarIcons: SidebarIcon[];
	presetSection: PresetSection;
	keypad: Keypad;
	quickActions: QuickAction[];
}

interface PresetSection {
	label: string; // "PRESET"
	amount: number; // 100000
	displayValue: string; // "$ 100.000"
	backgroundColor: string; // "#22C55E" (verde)
}

interface Keypad {
	display: KeypadDisplay;
	buttons: KeypadButton[];
	layout: KeypadLayout;
}

interface KeypadDisplay {
	currentInput: string;
	mode: "money" | "volume"; // "$" o "Vol."
	maxDigits: number;
}

interface KeypadButton {
	value: string; // '0'-'9', '.', 'Clear', 'Enter'
	label: string;
	type: "number" | "mode" | "action" | "clear" | "confirm";
	enabled: boolean;
	backgroundColor: string;
	position: {
		row: number;
		col: number;
	};
}

interface KeypadLayout {
	rows: number; // 5
	cols: number; // 3
	buttons: KeypadButton[][];
}

interface QuickAction {
	id: string;
	label: string; // "TANQUE LLENO"
	backgroundColor: string; // "#EF4444" (rojo)
	action: "full_tank";
}

// ============================================
// VISTA 7: PUNTOS COLOMBIA (FIDELIZACIÓN)
// ============================================

interface LoyaltyView {
	header: HeaderInfo;
	sidebarIcon: {
		id: string;
		label: string; // "PUNTOS COLOMBIA"
		icon: string;
		highlighted: boolean;
	};
	salesTable: SalesTable;
	actions: LoyaltyAction[];
}

interface SalesTable {
	title: string; // "ULTIMAS VENTAS"
	columns: string[]; // ["#FE", "ID PUNTOS", "ID PROMO", "PLACA", "PRODUCTO", "DINERO", "VOLUMEN"]
	rows: SaleRow[];
	maxRows: number; // 5
}

interface SaleRow {
	invoiceNumber: string;
	pointsId: string;
	promoId: string;
	plate: string;
	product: string;
	amount: string;
	volume: string;
}

interface LoyaltyAction {
	id: string;
	label: string;
	type: "print" | "home";
	icon: string;
	enabled: boolean;
}

// ============================================
// VISTA 8: MÉTODOS DE PAGO
// ============================================

interface PaymentMethodsView {
	header: HeaderInfo;
	sidebarIcons: SidebarIcon[];
	salesTable: SalesTable;
	paymentMethods: PaymentMethodSection;
	paymentDetails: PaymentDetails;
	actions: PaymentAction[];
}

interface PaymentMethodSection {
	title: string; // "METODOS DE PAGO"
	methods: PaymentMethod[];
}

interface PaymentMethod {
	id: string;
	label: string; // "TARJETA", "EFECTIVO", "OTRO"
	enabled: boolean;
	selected: boolean;
}

interface PaymentDetails {
	sections: PaymentDetailSection[];
}

interface PaymentDetailSection {
	id: string;
	label: string; // "BANCO", "MONTO", "FRANQUICIA"
	value: string;
	type: "text" | "number";
	editable: boolean;
}

interface PaymentAction {
	id: string;
	label: string; // "CONSULTA DE PUNTOS", "PROCESAR REDENCION", "GUARDAR"
	type: "query" | "process" | "save";
	backgroundColor: string; // "#F97316" (naranja) o "#22C55E" (verde)
	icon?: string;
	enabled: boolean;
}

// ============================================
// VISTA 9: REGISTRO DE CLIENTE
// ============================================

interface ClientRegistrationView {
	header: HeaderInfo;
	sidebarIcon: {
		id: string;
		label: string; // "REGISTRAR CLIENTES"
		icon: string;
		highlighted: boolean;
	};
	form: ClientRegistrationForm;
	action: ClientRegistrationAction;
}

interface ClientRegistrationForm {
	fields: ClientFormField[];
}

interface ClientFormField {
	id: string;
	label: string; // "TIPO DE DOCUMENTO:", "NUMERO DE IDENTIFICACION:", etc.
	type: "text" | "number" | "email" | "select";
	value: string;
	placeholder?: string;
	required: boolean;
	span: "full" | "half";
	dvField?: boolean; // Para el campo DV
}

interface ClientRegistrationAction {
	label: string; // "REGISTRAR"
	type: "submit";
	enabled: boolean;
	backgroundColor: string; // "#22C55E" (verde)
}

// ============================================
// VISTA 10: UTILIDADES
// ============================================

interface UtilitiesView {
	header: HeaderInfo;
	sidebarIcon: {
		id: string;
		label: string; // "UTILIDADES"
		icon: string;
		highlighted: boolean;
	};
	salesTable: SalesTable;
	utilityOptions: UtilityOption[];
}

interface UtilityOption {
	id: string;
	label: string; // "TEST DE IMPRESION", "AJUSTES IMPRESORA", "ULTIMAS VENTAS", etc.
	icon: string;
	action: UtilityAction;
	borderColor: string;
	enabled: boolean;
	position: {
		row: number;
		col: number;
	};
}

type UtilityAction =
	| "PRINT_TEST"
	| "BLUETOOTH_SETTINGS"
	| "LAST_SALES"
	| "LAST_TURN"
	| "RESTART"
	| "HOME";

// ============================================
// VISTA 11: FINALIZACIÓN DE VENTA
// ============================================

interface SaleFinalizationView {
	header: HeaderInfo;
	sidebarIcons: SidebarIcon[];
	saleTypeButtons: SaleTypeButton[];
	vehicleInfo: VehicleInfo;
	invoiceInfo: InvoiceInfo;
	loyaltyInfo: LoyaltyInfo;
	paymentMethods: PaymentMethodSection;
	paymentDetails: PaymentDetails;
	actions: FinalizationAction[];
}

interface SaleTypeButton {
	id: string;
	label: string; // "CONTADO", "CREDITO"
	type: "cash" | "credit";
	backgroundColor: string; // "#22C55E" (verde) o "#EF4444" (rojo)
	selected: boolean;
}

interface VehicleInfo {
	plate: {
		label: string; // "PLACA"
		value: string; // "BCC453"
	};
}

interface InvoiceInfo {
	electronicInvoiceId: {
		label: string; // "ID FACTURA ELECTRONICA"
		value: string;
	};
	coupon: {
		label: string; // "CUPON?"
		value: boolean;
	};
	promotionId: {
		label: string; // "ID PROMOCION"
		value: string;
	};
}

interface LoyaltyInfo {
	pointsId: {
		label: string; // "ID PUNTOS COLOMBIA"
		value: string;
	};
}

interface FinalizationAction {
	id: string;
	label: string; // "GUARDAR"
	type: "save" | "print" | "cancel";
	icon?: string;
	backgroundColor?: string;
	borderColor?: string;
	enabled: boolean;
}

// ============================================
// MODELOS DE DATOS ADICIONALES
// ============================================

interface Product {
	id: string;
	name: string;
	type: "combustible" | "producto" | "servicio";
	code: string;
	unitPrice: number;
	stock?: number;
	unit: "litros" | "galones" | "unidades";
	tax: number;
	active: boolean;
}

interface Customer {
	id: string;
	documentType: string;
	documentNumber: string;
	dv?: string; // Dígito de verificación
	name: string;
	socialReason?: string;
	email?: string;
	plate?: string;
	pointsId?: string;
	promoId?: string;
	creditLimit?: number;
	creditBalance?: number;
	type: "contado" | "credito";
}

interface Sale {
	id: string;
	invoiceNumber: string;
	electronicInvoiceId?: string;
	timestamp: Date;
	turnId: string;
	userId: string;
	userName: string;
	type: "contado" | "credito";
	status: "completada" | "cancelada" | "pendiente";

	items: SaleItem[];
	customer?: Customer;

	// Información de vehículo
	plate?: string;

	// Información de fidelización
	loyaltyPoints?: {
		pointsId: string;
		promoId?: string;
		coupon: boolean;
	};

	// Totales
	subtotal: number;
	tax: number;
	total: number;

	// Método de pago
	paymentMethod: PaymentMethodInfo;
}

interface SaleItem {
	productId: string;
	productName: string;
	quantity: number;
	unit: string;
	unitPrice: number;
	tax: number;
	total: number;
	pumpNumber?: string;
}

interface PaymentMethodInfo {
	type: "tarjeta" | "efectivo" | "otro";
	bank?: string;
	amount: number;
	franchise?: string;
	reference?: string;
}

interface SystemConfiguration {
	station: StationInfo;

	// Configuración de impresión
	printerConfig: {
		enabled: boolean;
		connectionType: "bluetooth" | "usb" | "network";
		deviceName?: string;
		paperWidth: number;
		autoPrint: boolean;
	};

	// Configuración de facturación
	invoiceConfig: {
		electronicInvoiceEnabled: boolean;
		resolutionNumber: string;
		prefix: string;
		currentNumber: number;
	};

	// Configuración de turnos
	turnConfig: {
		requirePasswordToClose: boolean;
		autoCloseAfterHours: number;
		allowMultipleTurns: boolean;
	};

	// Configuración de presets
	presetConfig: {
		defaultAmount: number; // 100000
		quickAmounts: number[];
	};
}

// ============================================
// EXPORTS
// ============================================

export type {
	// Configuración y usuario
	User,
	Turn,
	StationInfo,
	SystemConfiguration,
	// Vistas principales
	SplashScreenView,
	MainMenuView,
	LoginView,
	ActiveTurnMenuView,
	CloseTurnView,
	KeypadView,
	LoyaltyView,
	PaymentMethodsView,
	ClientRegistrationView,
	UtilitiesView,
	SaleFinalizationView,
	// Componentes de UI
	HeaderInfo,
	ContactInfo,
	MenuOption,
	MenuAction,
	TurnStatus,
	SidebarButton,
	SidebarIcon,
	LoginField,
	LoginAction,
	CloseTurnAction,
	PresetSection,
	Keypad,
	KeypadDisplay,
	KeypadButton,
	KeypadLayout,
	QuickAction,
	SalesTable,
	SaleRow,
	LoyaltyAction,
	PaymentMethodSection,
	PaymentMethod,
	PaymentDetails,
	PaymentDetailSection,
	PaymentAction,
	ClientRegistrationForm,
	ClientFormField,
	ClientRegistrationAction,
	UtilityOption,
	UtilityAction,
	SaleTypeButton,
	VehicleInfo,
	InvoiceInfo,
	LoyaltyInfo,
	FinalizationAction,
	// Modelos de datos
	Product,
	Customer,
	Sale,
	SaleItem,
	PaymentMethodInfo,
};
