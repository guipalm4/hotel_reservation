export const fetchRooms = async () => {
	const response = await fetch("http://localhost:3001/rooms");
	return await response.json();
};

export const makeReservation = async (
	roomId: string,
	name: string,
	cpf: string
) => {
	const response = await fetch("http://localhost:3001/reserve", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ roomId, name, cpf }),
	});
	return await response.json();
};

export const checkIn = async (cpf: string, reservationId: string) => {
	const response = await fetch("http://localhost:3001/checkin", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ cpf, reservationId }),
	});
	return await response.json();
};
