import { Reservation } from "../entities/Reservation";

export interface ReservationRepository {
	findAll(): Promise<Reservation[]>;
	findById(id: string): Promise<Reservation | null>;
	save(reservation: Reservation): Promise<void>;
	deleteById(id: string): Promise<void>;
}
