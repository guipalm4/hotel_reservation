import cors from "cors";
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";
import { generateReservationCode } from "./code-generator.js";

// Substituto para __dirname em ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Caminhos para os arquivos JSON
const roomsFilePath = path.join(__dirname, "rooms.json");
const reservationsFilePath = path.join(__dirname, "reservations.json");

// Função para carregar dados dos arquivos JSON
function loadData(filePath) {
	try {
		const data = fs.readFileSync(filePath, "utf8");
		return JSON.parse(data);
	} catch (err) {
		// Retorna um array vazio se o arquivo não existe
		return [];
	}
}

// Função para salvar dados nos arquivos JSON
function saveData(filePath, data) {
	fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
}

// Carrega os dados de rooms e reservations ao iniciar
let rooms = loadData(roomsFilePath);
let reservations = loadData(reservationsFilePath);

// Função para salvar os quartos
function saveRooms() {
	saveData(roomsFilePath, rooms);
}

// Função para salvar as reservas
function saveReservations() {
	saveData(reservationsFilePath, reservations);
}

// Cadastro de quarto com preço
app.post("/rooms", (req, res) => {
	const { beds, breakfast, guests, balcony, price } = req.body;

	if (!beds || !guests || price === undefined || price < 0) {
		return res.status(400).json({ error: "Invalid data" });
	}

	const newRoom = {
		id: uuidv4(),
		beds,
		breakfast,
		guests,
		balcony,
		price,
		available: true,
	};

	rooms.push(newRoom);
	saveRooms();

	res.status(201).json(newRoom);
});

// Listar todos os quartos
app.get("/rooms", (req, res) => {
	console.log("Rooms:", rooms);
	res.json(rooms);
});

// Fazer uma reserva
app.post("/reserve", (req, res) => {
	const { roomId, name, cpf } = req.body;

	const room = rooms.find((room) => room.id === roomId);

	if (!room) {
		return res.status(400).json({ error: "Room not found" });
	}

	if (room.available === false) {
		return res.status(400).json({ error: "Room already reserved" });
	}

	const reservationId = generateReservationCode();

	room.available = false;

	saveRooms();

	reservations.push({ reservationId, roomId, name, cpf });
	saveReservations();

	res.status(201).json({ reservationId });
});

// Fazer check-in
app.post("/checkin", (req, res) => {
	const { cpf, reservationId } = req.body;

	// Encontra a reserva com o reservationId e CPF fornecidos
	const reservation = reservations.find(
		(r) => r.cpf === cpf && r.reservationId === reservationId
	);

	if (!reservation) {
		return res.status(400).json({ error: "Invalid CPF or reservation ID" });
	}

	// Remove a reserva após o check-in bem-sucedido
	reservations = reservations.filter((r) => r.reservationId !== reservationId);
	saveData(reservationsFilePath, reservations);

	res.json({ success: true });
});

// Listar todas as reservas
app.get("/reservations", (req, res) => {
	res.json(reservations);
});

app.listen(3001, () => console.log("Backend running on port 3001"));
