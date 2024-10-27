import { Room } from "../entities/Room";

export interface RoomRepository {
	findAll(): Promise<Room[]>;
	create(room: Room): Promise<Room>;
}
