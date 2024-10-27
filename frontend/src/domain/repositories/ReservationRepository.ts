import { Reservation } from "../entities/Reservation";

export interface ReservationRepository {
	findById(id: string): Promise<Reservation | null>;

	save(reservation: {
		roomId: string;
		name: string;
		cpf: string;
	}): Promise<string>;

	deleteById(id: string): Promise<void>;
}
