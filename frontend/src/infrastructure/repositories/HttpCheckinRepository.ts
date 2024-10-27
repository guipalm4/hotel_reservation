import { CheckinRepository } from "../../domain/repositories/CheckinRepository";

export class HttpCheckinRepository implements CheckinRepository {
	private apiUrl = "http://localhost:3001/checkin";

	async checkIn(cpf: string, reservationId: string): Promise<boolean> {
		const response = await fetch(this.apiUrl, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ cpf, reservationId }),
		});
		const data = await response.json();
		return data.success;
	}
}
