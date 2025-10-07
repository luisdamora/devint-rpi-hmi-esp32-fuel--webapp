import { ViewManager } from "./lib/navigation/view-manager";
import { HMIFrame } from "./components/layout/hmi-frame";
import "./App.css";

function App() {
	return (
		<div className="App">
			<HMIFrame>
				<ViewManager />
			</HMIFrame>
		</div>
	);
}

export default App;
