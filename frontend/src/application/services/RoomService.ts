import { Room } from "../../domain/entities/Room";
import { RoomRepository } from "../../domain/repositories/RoomRepository";
import { CreateRoomDTO } from "../dtos/CreateRoomDTO";

export class RoomService {
	constructor(private roomRepository: RoomRepository) {}

	async listAvailableRooms(): Promise<Room[]> {
		const rooms = await this.roomRepository.findAll();
		return rooms.filter((room) => room.available);
	}

	async createRoom(roomData: CreateRoomDTO): Promise<Room> {
		const newRoom = new Room(
			"",
			roomData.beds,
			roomData.breakfast,
			roomData.guests,
			roomData.balcony,
			roomData.price,
			true
		);
		return this.roomRepository.create(newRoom);
	}
}
