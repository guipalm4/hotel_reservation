import { Room } from "../../domain/entities/Room";
import { RoomRepository } from "../../domain/repositories/RoomRepository";

export class RoomService {
	constructor(private roomRepository: RoomRepository) {}

	async listAvailableRooms(): Promise<Room[]> {
		const rooms = await this.roomRepository.findAll();
		return rooms.filter((room) => room.available);
	}

	async reserveRoom(roomId: string): Promise<void> {
		const room = await this.roomRepository.findById(roomId);
		if (!room) throw new Error("Room not found");
		room.markAsUnavailable();
		await this.roomRepository.save(room);
	}
}
