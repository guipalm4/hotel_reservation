import { CheckinRepository } from "../../domain/repositories/CheckinRepository";
import { CheckinResponse } from "../dtos/CheckinResponse";

export class CheckinUseCase {
	constructor(private checkinRepository: CheckinRepository) {}

	async execute(cpf: string, reservationId: string): Promise<CheckinResponse> {
		try {
			const success = await this.checkinRepository.checkIn(cpf, reservationId);
			if (success) {
				return { success: true };
			} else {
				return { success: false, message: "Invalid CPF or reservation ID" };
			}
		} catch (error: unknown) {
			// Verificamos se o erro é uma instância de Error para acessar a propriedade `message`
			if (error instanceof Error) {
				return { success: false, message: error.message };
			}
			// Caso o erro não seja uma instância de Error, retornamos uma mensagem padrão
			return { success: false, message: "Check-in failed" };
		}
	}
}
