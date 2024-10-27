import { RoomResponse } from "../../application/dtos/RoomResponse";
import { Room } from "../../domain/entities/Room";
import { RoomRepository } from "../../domain/repositories/RoomRepository";

export class HttpRoomRepository implements RoomRepository {
	private apiUrl = "http://localhost:3001/rooms";

	async findAll(): Promise<Room[]> {
		const response = await fetch(this.apiUrl);
		const data = await response.json();
		return data.map(
			(roomData: RoomResponse) =>
				new Room(
					roomData.id,
					roomData.beds,
					roomData.breakfast,
					roomData.guests,
					roomData.balcony,
					roomData.price,
					roomData.available
				)
		);
	}

	async create(room: Room): Promise<Room> {
		const response = await fetch(this.apiUrl, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(room),
		});
		const data = await response.json();

		return new Room(
			data.id,
			room.beds,
			room.breakfast,
			room.guests,
			room.balcony,
			room.price,
			room.available
		);
	}
}
