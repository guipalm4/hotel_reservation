import React, { useState } from "react";
import { checkinUseCase } from "../../DependencyInjection";
import { CheckinResponse } from "../../application/dtos/CheckinResponse";

const Checkin: React.FC = () => {
	const [cpf, setCpf] = useState("");
	const [reservationId, setReservationId] = useState("");
	const [success, setSuccess] = useState<boolean | null>(null);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const handleCheckin = async (e: React.FormEvent) => {
		e.preventDefault();
		const response: CheckinResponse = await checkinUseCase.execute(
			cpf,
			reservationId
		);

		if (response.success) {
			setSuccess(true);
			setCpf("");
			setReservationId("");
			setErrorMessage(null);
			setTimeout(() => setSuccess(null), 3000);
		} else {
			setSuccess(false);
			setErrorMessage(response.message || "Check-in failed");
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

			{success === true && <p>Check-in successful!</p>}
			{success === false && errorMessage && <p>{errorMessage}</p>}
		</div>
	);
};

export default Checkin;
