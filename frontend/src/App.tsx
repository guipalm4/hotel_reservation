import React from "react";
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Checkin from "./ui/pages/Checkin";
import RoomForm from "./ui/pages/RoomForm";
import RoomSelection from "./ui/pages/RoomSelection";

const App: React.FC = () => {
	return (
		<Router>
			<nav>
				<ul>
					<li>
						<Link to="/rooms">Create Room</Link>
					</li>
					<li>
						<Link to="/reserve">Reserve Room</Link>
					</li>
					<li>
						<Link to="/checkin">Check-in</Link>
					</li>
				</ul>
			</nav>

			<Routes>
				<Route path="/rooms" element={<RoomForm />} />
				<Route path="/checkin" element={<Checkin />} />
				<Route path="/reserve" element={<RoomSelection />} />
			</Routes>
		</Router>
	);
};

export default App;
