import React, { useEffect, useState } from "react";

const RoomSelection: React.FC = () => {
	const [rooms, setRooms] = useState<any[]>([]);
	const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
	const [name, setName] = useState("");
	const [cpf, setCpf] = useState("");
	const [showModal, setShowModal] = useState(true);
	const [reservationMessage, setReservationMessage] = useState<string | null>(
		null
	);
	const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);

	const fetchRooms = async () => {
		const response = await fetch("http://localhost:3001/rooms");
		const data = await response.json();
		const availableRooms = data.filter((room: any) => room.available === true);
		setRooms(availableRooms);
	};

	const makeReservation = async (roomId: string, name: string, cpf: string) => {
		const response = await fetch("http://localhost:3001/reserve", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ roomId, name, cpf }),
		});
		const data = await response.json();
		setReservationMessage(
			`Reservation successful! Your ID is ${data.reservationId}`
		);
		setIsReservationModalOpen(true);
	};

	useEffect(() => {
		fetchRooms();
	}, []);

	const handleCardClick = (roomId: string) => {
		setSelectedRoom(roomId);
	};

	const handleReserve = () => {
		if (selectedRoom && name && cpf) {
			makeReservation(selectedRoom, name, cpf);
		}
	};

	const closeReservationModal = () => {
		setIsReservationModalOpen(false);
		setReservationMessage(null);
	};

	return (
		<div className="container">
			<h1>Select a Room</h1>

			{showModal && (
				<div className="modal">
					<h2>Enter your details</h2>
					<input
						type="text"
						placeholder="Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<input
						type="text"
						placeholder="CPF"
						value={cpf}
						onChange={(e) => setCpf(e.target.value)}
					/>
					<button onClick={() => setShowModal(false)}>Submit</button>
				</div>
			)}

			{!showModal && (
				<div>
					{rooms.map((room) => (
						<div
							key={room.id}
							className={`room-card ${
								selectedRoom === room.id ? "selected" : ""
							}`}
							onClick={() => handleCardClick(room.id)}
						>
							<div className="room-header">
								<div className="room-title">Room for {room.guests} guests</div>
								<div className="room-price">R$ {room.price},00 / night</div>
							</div>

							<div className="room-details">
								<div className="room-amenities">
									<img
										className="bed-icon"
										src="https://img.icons8.com/ios-filled/50/000000/bed.png"
										alt="Bed"
									/>
									{room.beds} Beds
								</div>
								<div
									className={`flag ${room.breakfast ? "enabled" : "disabled"}`}
								>
									Breakfast {room.breakfast ? "Included" : "Not included"}
								</div>
								<div
									className={`flag ${room.balcony ? "enabled" : "disabled"}`}
								>
									Balcony {room.balcony ? "Yes" : "No"}
								</div>
							</div>
						</div>
					))}
					<button onClick={handleReserve}>Confirm Reservation</button>
				</div>
			)}

			{isReservationModalOpen && (
				<div className="alert-modal">
					<div className="alert-modal-content">
						<p>{reservationMessage}</p>
						<button onClick={closeReservationModal}>Close</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default RoomSelection;
