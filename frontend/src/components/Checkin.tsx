import React, { useState } from "react";

const Checkin: React.FC = () => {
	const [cpf, setCpf] = useState("");
	const [reservationId, setReservationId] = useState("");
	const [success, setSuccess] = useState<boolean | null>(null); // Mudança para indicar sucesso ou falha

	const checkIn = async (cpf: string, reservationId: string) => {
		const response = await fetch("http://localhost:3001/checkin", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ cpf, reservationId }),
		});
		const data = await response.json();
		return data.success;
	};

	const handleCheckin = async (e: React.FormEvent) => {
		e.preventDefault(); // Prevenindo o comportamento padrão de envio do formulário
		const result = await checkIn(cpf, reservationId);
		if (result) {
			setSuccess(true);
			setCpf("");
			setReservationId("");
			setTimeout(() => {
				setSuccess(null);
			}, 3000);
		} else {
			setSuccess(false);
		}
	};

	return (
		<div className="container">
			<h1>Check-in</h1>
			<form onSubmit={handleCheckin}>
				<label htmlFor="cpf">ID number:</label>
				<input
					id="cpf"
					type="text"
					value={cpf}
					onChange={(e) => setCpf(e.target.value)}
				/>

				<label htmlFor="reservationId">Reservation ID:</label>
				<input
					id="reservationId"
					type="text"
					value={reservationId}
					onChange={(e) => setReservationId(e.target.value)}
				/>

				<button type="submit">Check-in</button>
			</form>
			{/* Renderizando uma mensagem com base no resultado do check-in */}
			{success === true && <p>Check-in successful!</p>}
			{success === false && <p>Invalid CPF or reservation ID</p>}
		</div>
	);
};

export default Checkin;
