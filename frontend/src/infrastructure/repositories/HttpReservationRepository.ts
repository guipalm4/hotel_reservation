import { Reservation } from "../../domain/entities/Reservation";
import { ReservationRepository } from "../../domain/repositories/ReservationRepository";

export class HttpReservationRepository implements ReservationRepository {
	private apiUrl = "http://localhost:3001/reservations";

	async findById(id: string): Promise<Reservation | null> {
		const response = await fetch(`${this.apiUrl}/${id}`);
		if (!response.ok) return null;
		const data = await response.json();
		return new Reservation(data.id, data.roomId, data.name, data.cpf);
	}

	async save(reservation: {
		roomId: string;
		name: string;
		cpf: string;
	}): Promise<string> {
		const response = await fetch(this.apiUrl, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(reservation),
		});
		const data = await response.json();
		return data.reservationId;
	}

	async deleteById(id: string): Promise<void> {
		await fetch(`${this.apiUrl}/${id}`, { method: "DELETE" });
	}
}
