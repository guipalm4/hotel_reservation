import { Room } from "../../domain/entities/Room";
import { RoomRepository } from "../../domain/repositories/RoomRepository";
import { RoomData } from "../dtos/RoomData";

export class HttpRoomRepository implements RoomRepository {
	private apiUrl = "http://localhost:3001/rooms";

	async findAll(): Promise<Room[]> {
		const response = await fetch(this.apiUrl);
		const data = await response.json();
		return data.map(
			(roomData: RoomData) =>
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

	async findById(id: string): Promise<Room | null> {
		const response = await fetch(`${this.apiUrl}/${id}`);
		if (!response.ok) return null;
		const roomData: RoomData = await response.json();
		return new Room(
			roomData.id,
			roomData.beds,
			roomData.breakfast,
			roomData.guests,
			roomData.balcony,
			roomData.price,
			roomData.available
		);
	}

	async save(room: Room): Promise<void> {
		await fetch(`${this.apiUrl}/${room.id}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(room),
		});
	}
}
