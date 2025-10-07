/**
 * Demo UI Store Component
 * 
 * Componente de demostración para probar el UI Store
 * Puedes importar este componente en cualquier vista para testear el store
 * 
 * @example
 * import { DemoUIStore } from '@/components/demo-ui-store';
 * 
 * // En tu componente
 * <DemoUIStore />
 */

import React from 'react';
import { useSession, useMenuTheme, useNotifications } from '@/lib/hooks/use-ui-store-helpers';
import { useUIStore } from '@/lib/store/ui-store';

export const DemoUIStore: React.FC = () => {
	const [operatorName, setOperatorName] = React.useState('Operador Demo');
	
	// Hooks personalizados
	const { isAuthenticated, isTurnActive, operatorName: currentOperator, login, logout, startTurn, closeTurn } = useSession();
	const { borderColor } = useMenuTheme();
	const { success, error, info } = useNotifications();
	
	// Estado completo (para debug)
	const fullState = useUIStore();

	return (
		<div style={{ 
			padding: '24px', 
			backgroundColor: '#1a1a1a', 
			color: 'white',
			borderRadius: '8px',
			maxWidth: '800px',
			margin: '20px auto',
			fontFamily: 'system-ui'
		}}>
			<h2 style={{ marginBottom: '20px', borderBottom: `3px solid ${borderColor}`, paddingBottom: '10px' }}>
				🧪 Demo UI Store - Zustand v5
			</h2>

			{/* Estado Visual */}
			<div style={{ 
				display: 'grid', 
				gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
				gap: '16px',
				marginBottom: '24px'
			}}>
				<StatusCard 
					title="Autenticación" 
					value={isAuthenticated ? '✅ Autenticado' : '❌ No autenticado'}
					color={isAuthenticated ? '#22C55E' : '#EF4444'}
				/>
				<StatusCard 
					title="Turno" 
					value={isTurnActive ? '✅ Activo' : '❌ Inactivo'}
					color={isTurnActive ? '#22C55E' : '#EF4444'}
				/>
				<StatusCard 
					title="Operador" 
					value={currentOperator || 'Sin asignar'}
					color={borderColor}
				/>
				<StatusCard 
					title="Color de Menú" 
					value={borderColor}
					color={borderColor}
				/>
			</div>

			{/* Acciones de Sesión */}
			<div style={{ marginBottom: '24px' }}>
				<h3 style={{ marginBottom: '12px' }}>Acciones de Sesión</h3>
				
				{!isAuthenticated ? (
					<div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
						<input 
							type="text"
							value={operatorName}
							onChange={(e) => setOperatorName(e.target.value)}
							placeholder="Nombre del operador"
							style={{
								padding: '8px 12px',
								borderRadius: '4px',
								border: 'none',
								flex: 1
							}}
						/>
						<button
							type="button"
							onClick={() => {
								login(operatorName);
								success(`Sesión iniciada: ${operatorName}`);
							}}
							style={buttonStyle('#22C55E')}
						>
							🔐 Login (Auto-inicia turno)
						</button>
					</div>
				) : (
					<div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
						{!isTurnActive && (
							<button
								type="button"
								onClick={() => {
									startTurn();
									info('Turno iniciado');
								}}
								style={buttonStyle('#3B82F6')}
							>
								▶️ Iniciar Turno
							</button>
						)}
						
						{isTurnActive && (
							<button
								type="button"
								onClick={() => {
									closeTurn('Cierre desde demo');
									success('Turno cerrado correctamente');
								}}
								style={buttonStyle('#F59E0B')}
							>
								⏸️ Cerrar Turno
							</button>
						)}
						
						<button
							type="button"
							onClick={() => {
								logout();
								info('Sesión cerrada');
							}}
							style={buttonStyle('#EF4444')}
						>
							🚪 Logout
						</button>
					</div>
				)}
			</div>

			{/* Acciones de Notificaciones */}
			<div style={{ marginBottom: '24px' }}>
				<h3 style={{ marginBottom: '12px' }}>Probar Notificaciones</h3>
				<div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
					<button
						type="button"
						onClick={() => success('¡Operación exitosa!')}
						style={buttonStyle('#22C55E')}
					>
						✅ Success
					</button>
					<button
						type="button"
						onClick={() => error('Error de prueba')}
						style={buttonStyle('#EF4444')}
					>
						❌ Error
					</button>
					<button
						type="button"
						onClick={() => info('Información general')}
						style={buttonStyle('#3B82F6')}
					>
						ℹ️ Info
					</button>
				</div>
			</div>

			{/* Debug State */}
			<details style={{ marginTop: '24px' }}>
				<summary style={{ 
					cursor: 'pointer', 
					padding: '12px',
					backgroundColor: '#2a2a2a',
					borderRadius: '4px',
					fontWeight: 'bold'
				}}>
					🐛 Ver Estado Completo (Debug)
				</summary>
				<pre style={{ 
					backgroundColor: '#0a0a0a',
					padding: '16px',
					borderRadius: '4px',
					overflow: 'auto',
					fontSize: '12px',
					marginTop: '12px',
					maxHeight: '400px'
				}}>
					{JSON.stringify({
						session: {
							isAuthenticated: fullState.isAuthenticated,
							isTurnActive: fullState.isTurnActive,
							operatorName: fullState.operatorName,
							sessionId: fullState.sessionId,
							turnStartTime: fullState.turnStartTime,
						},
						ui: {
							menuBorderColor: fullState.menuBorderColor,
							menuTilesEnabled: fullState.menuTilesEnabled,
							showCloseTurnDialog: fullState.showCloseTurnDialog,
							isLoading: fullState.isLoading,
							notification: fullState.notification,
						},
						turn: {
							turnClosed: fullState.turnClosed,
							closeTurnReason: fullState.closeTurnReason,
							lastTurnCloseTime: fullState.lastTurnCloseTime,
						}
					}, null, 2)}
				</pre>
				<button
					type="button"
					onClick={() => {
						fullState.resetAll();
						info('Store reseteado');
					}}
					style={{...buttonStyle('#EF4444'), marginTop: '12px'}}
				>
					🔄 Reset Todo el Store
				</button>
			</details>

			{/* Info */}
			<div style={{ 
				marginTop: '24px',
				padding: '12px',
				backgroundColor: '#2a2a2a',
				borderRadius: '4px',
				fontSize: '14px'
			}}>
				<p style={{ margin: 0 }}>
					💡 <strong>Tip:</strong> Los datos se persisten en <code>sessionStorage</code>. 
					Recarga la página para ver la persistencia en acción.
				</p>
			</div>
		</div>
	);
};

// Helper component
const StatusCard: React.FC<{ title: string; value: string; color: string }> = ({ title, value, color }) => (
	<div style={{
		padding: '16px',
		backgroundColor: '#2a2a2a',
		borderRadius: '8px',
		borderLeft: `4px solid ${color}`
	}}>
		<div style={{ fontSize: '12px', opacity: 0.7, marginBottom: '4px' }}>{title}</div>
		<div style={{ fontSize: '16px', fontWeight: 'bold' }}>{value}</div>
	</div>
);

// Helper function
const buttonStyle = (bgColor: string): React.CSSProperties => ({
	padding: '10px 16px',
	backgroundColor: bgColor,
	color: 'white',
	border: 'none',
	borderRadius: '4px',
	cursor: 'pointer',
	fontWeight: 'bold',
	fontSize: '14px',
	transition: 'opacity 0.2s',
});
