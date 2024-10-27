import { ReservationService } from "./application/services/ReservationService";
import { RoomService } from "./application/services/RoomService";
import { HttpReservationRepository } from "./infrastructure/repositories/HttpReservationRepository";
import { HttpRoomRepository } from "./infrastructure/repositories/HttpRoomRepository";

// Configuração dos repositórios concretos
const roomRepository = new HttpRoomRepository();
const reservationRepository = new HttpReservationRepository();

// Injeção dos serviços com os repositórios
export const roomService = new RoomService(roomRepository);
export const reservationService = new ReservationService(reservationRepository);
