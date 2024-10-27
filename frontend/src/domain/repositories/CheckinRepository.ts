export interface CheckinRepository {
	checkIn(cpf: string, reservationId: string): Promise<boolean>;
}
