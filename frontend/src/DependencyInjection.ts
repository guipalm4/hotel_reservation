import { CheckinUseCase } from "./application/services/CheckinUseCase";
import { ReservationService } from "./application/services/ReservationService";
import { RoomService } from "./application/services/RoomService";
import { HttpCheckinRepository } from "./infrastructure/repositories/HttpCheckinRepository";
import { HttpReservationRepository } from "./infrastructure/repositories/HttpReservationRepository";
import { HttpRoomRepository } from "./infrastructure/repositories/HttpRoomRepository";

// Configuração dos repositórios concretos
const roomRepository = new HttpRoomRepository();
const reservationRepository = new HttpReservationRepository();
const checkinRepository = new HttpCheckinRepository();

// Injeção dos serviços com os repositórios
export const roomService = new RoomService(roomRepository);
export const reservationService = new ReservationService(reservationRepository);
export const checkinUseCase = new CheckinUseCase(checkinRepository);
