import React, { useState } from "react";

const RoomForm: React.FC = () => {
	const [beds, setBeds] = useState(1);
	const [breakfast, setBreakfast] = useState(false);
	const [guests, setGuests] = useState(1);
	const [balcony, setBalcony] = useState(false);
	const [price, setPrice] = useState(0);
	const [message, setMessage] = useState<string | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		// Lógica para enviar os dados para o backend
		const roomData = { beds, breakfast, guests, balcony, price };
		fetch("http://localhost:3001/rooms", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(roomData),
		})
			.then((response) => response.json())
			.then((data) => {
				setMessage(`Room created with ID: ${data.id}`);
				setIsModalOpen(true);
			})
			.catch(() => {
				setMessage("Error creating room");
				setIsModalOpen(true);
			});
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setMessage(null);
	};

	return (
		<div className="container">
			<h1>Create a Room</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor="beds">Beds:</label>
				<input
					id="beds"
					type="number"
					value={beds}
					onChange={(e) => setBeds(parseInt(e.target.value))}
					min="1"
				/>
				<label htmlFor="breakfast">Breakfast included:</label>
				<input
					id="breakfast"
					type="checkbox"
					checked={breakfast}
					onChange={() => setBreakfast(!breakfast)}
				/>
				<label htmlFor="guests">Number of Guests:</label>
				<input
					id="guests"
					type="number"
					value={guests}
					onChange={(e) => setGuests(parseInt(e.target.value))}
					min="1"
				/>
				<label htmlFor="balcony">Balcony:</label>
				<input
					id="balcony"
					type="checkbox"
					checked={balcony}
					onChange={() => setBalcony(!balcony)}
				/>
				<label htmlFor="price">Price (R$):</label> {/* Novo campo de preço */}
				<input
					id="price"
					type="number"
					value={price}
					onChange={(e) => setPrice(parseFloat(e.target.value))}
					min="0"
					step="0.01"
				/>
				<button type="submit">Create Room</button>
			</form>

			{isModalOpen && (
				<div className="alert-modal">
					<div className="alert-modal-content">
						<p>{message}</p>
						<button onClick={closeModal}>Close</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default RoomForm;
