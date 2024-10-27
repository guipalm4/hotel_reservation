import React, { useEffect, useState } from "react";
import { reservationService, roomService } from "../../DependencyInjection"; // Importando o serviço injetado pelo arquivo de injeção de dependências
import { Room } from "../../domain/entities/Room";

const RoomSelection: React.FC = () => {
	const [rooms, setRooms] = useState<Room[]>([]);
	const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
	const [name, setName] = useState("");
	const [cpf, setCpf] = useState("");
	const [showModal, setShowModal] = useState(true);
	const [reservationMessage, setReservationMessage] = useState<string | null>(
		null
	);
	const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);

	// Carrega os quartos disponíveis ao carregar o componente
	useEffect(() => {
		const loadRooms = async () => {
			const availableRooms = await roomService.listAvailableRooms(); // Usando o serviço injetado
			setRooms(availableRooms);
		};
		loadRooms();
	}, []);

	// Manipula a seleção de um quarto
	const handleCardClick = (roomId: string) => {
		setSelectedRoom(roomId);
	};

	// Realiza a reserva
	const handleReserve = async () => {
		if (selectedRoom && name && cpf) {
			const reservationId = await reservationService.makeReservation(
				selectedRoom,
				name,
				cpf
			);
			setReservationMessage(
				`Reservation successful! Your ID is ${reservationId}`
			);
			setIsReservationModalOpen(true);
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
