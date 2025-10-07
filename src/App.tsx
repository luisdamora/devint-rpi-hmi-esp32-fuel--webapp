import { HMIFrame } from "./components/layout/hmi-frame";
import { ViewManager } from "./lib/navigation/view-manager";
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
