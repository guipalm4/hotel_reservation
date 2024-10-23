import React, { useState } from "react";

const Checkin: React.FC = () => {
	const [cpf, setCpf] = useState("");
	const [reservationId, setReservationId] = useState("");
	const [success, setSuccess] = useState(false);

	const checkIn = async (cpf: string, reservationId: string) => {
		const response = await fetch("http://localhost:3001/checkin", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ cpf, reservationId }),
		});
		const data = await response.json();
		return data.success;
	};

	const handleCheckin = async () => {
		const result = await checkIn(cpf, reservationId);
		if (result) {
			setSuccess(true);
			alert("Check-in successful!");
			setCpf("");
			setReservationId("");
			setTimeout(() => {
				setSuccess(false);
			}, 3000);
		} else {
			alert("Invalid CPF or reservation ID");
		}
	};

	return (
		<div className="container">
			<h1>Check-in</h1>
			<form onSubmit={handleCheckin}>
				<label>ID number:</label>
				<input
					type="text"
					value={cpf}
					onChange={(e) => setCpf(e.target.value)}
				/>

				<label>Reservation ID:</label>
				<input
					type="text"
					value={reservationId}
					onChange={(e) => setReservationId(e.target.value)}
				/>

				<button type="submit">Check-in</button>
			</form>
		</div>
	);
};

export default Checkin;
