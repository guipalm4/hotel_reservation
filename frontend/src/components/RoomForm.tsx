import React, { useState } from "react";

const RoomForm: React.FC = () => {
	const [beds, setBeds] = useState(1);
	const [breakfast, setBreakfast] = useState(false);
	const [guests, setGuests] = useState(1);
	const [balcony, setBalcony] = useState(false);
	const [price, setPrice] = useState(0); // Novo estado para o preço

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		// Lógica para enviar os dados para o backend
		const roomData = { beds, breakfast, guests, balcony, price }; // Inclui o preço
		fetch("http://localhost:3001/rooms", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(roomData),
		})
			.then((response) => response.json())
			.then((data) => alert(`Room created with ID: ${data.id}`))
			.catch((error) => alert("Error creating room"));
	};

	return (
		<div className="container">
			<h1>Create a Room</h1>
			<form onSubmit={handleSubmit}>
				<label>Beds:</label>
				<input
					type="number"
					value={beds}
					onChange={(e) => setBeds(parseInt(e.target.value))}
					min="1"
				/>
				<label>Breakfast included:</label>
				<input
					type="checkbox"
					checked={breakfast}
					onChange={() => setBreakfast(!breakfast)}
				/>
				<label>Number of Guests:</label>
				<input
					type="number"
					value={guests}
					onChange={(e) => setGuests(parseInt(e.target.value))}
					min="1"
				/>
				<label>Balcony:</label>
				<input
					type="checkbox"
					checked={balcony}
					onChange={() => setBalcony(!balcony)}
				/>
				<label>Price (R$):</label> {/* Novo campo de preço */}
				<input
					type="number"
					value={price}
					onChange={(e) => setPrice(parseFloat(e.target.value))}
					min="0"
					step="0.01"
				/>
				<button type="submit">Create Room</button>
			</form>
		</div>
	);
};

export default RoomForm;
