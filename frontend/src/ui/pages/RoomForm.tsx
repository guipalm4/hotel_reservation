import React, { useState } from "react";
import { roomService } from "../../DependencyInjection"; // Importa o serviço injetado
import { CreateRoomDTO } from "../../application/dtos/CreateRoomDTO"; // Importa o DTO de criação

const RoomForm: React.FC = () => {
	const [beds, setBeds] = useState(1);
	const [breakfast, setBreakfast] = useState(false);
	const [guests, setGuests] = useState(1);
	const [balcony, setBalcony] = useState(false);
	const [price, setPrice] = useState(0);
	const [message, setMessage] = useState<string | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const roomData: CreateRoomDTO = {
				beds,
				breakfast,
				guests,
				balcony,
				price,
			};
			const createdRoom = await roomService.createRoom(roomData);
			setMessage(`Room created with ID: ${createdRoom.id}`);
			setIsModalOpen(true);
		} catch (error) {
			setMessage("Error creating room");
			setIsModalOpen(true);
		}
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
				<label htmlFor="price">Price (R$):</label>
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
