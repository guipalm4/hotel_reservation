import { ReservationRepository } from "../../domain/repositories/ReservationRepository";

export class ReservationService {
	constructor(private reservationRepository: ReservationRepository) {}

	async makeReservation(
		roomId: string,
		name: string,
		cpf: string
	): Promise<string> {
		const reservationId = await this.reservationRepository.save({
			roomId,
			name,
			cpf,
		});
		return reservationId;
	}

	async checkIn(cpf: string, reservationId: string): Promise<boolean> {
		const reservation = await this.reservationRepository.findById(
			reservationId
		);
		if (reservation && reservation.cpf === cpf) {
			await this.reservationRepository.deleteById(reservationId);
			return true;
		}
		return false;
	}
}
