import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import RoomSelection from "../components/RoomSelection";

describe("RoomSelection Component", () => {
	beforeEach(() => {
		global.fetch = jest.fn((url) => {
			if (url.includes("/rooms")) {
				return Promise.resolve({
					json: () =>
						Promise.resolve([
							{
								id: "1",
								guests: 2,
								beds: 2,
								price: 150,
								breakfast: true,
								balcony: true,
								available: true,
							},
							{
								id: "2",
								guests: 3,
								beds: 3,
								price: 200,
								breakfast: false,
								balcony: false,
								available: true,
							},
						]),
				});
			} else if (url.includes("/reserve")) {
				return Promise.resolve({
					json: () => Promise.resolve({ reservationId: "ABC123" }),
				});
			}
		}) as jest.Mock;
	});

	test("renders room selection and modal flow correctly", async () => {
		render(<RoomSelection />);

		// Testando a exibição inicial da modal de entrada de dados
		expect(screen.getByText("Enter your details")).toBeInTheDocument();

		// Preenchendo o nome e CPF e submetendo a modal
		fireEvent.change(screen.getByPlaceholderText("Name"), {
			target: { value: "John Doe" },
		});
		fireEvent.change(screen.getByPlaceholderText("CPF"), {
			target: { value: "12345678900" },
		});
		fireEvent.click(screen.getByText("Submit"));

		// Verificando se os quartos são exibidos após o envio dos dados
		expect(await screen.findByText("Room for 2 guests")).toBeInTheDocument();
		expect(screen.getByText("Room for 3 guests")).toBeInTheDocument();

		// Selecionando um quarto
		fireEvent.click(screen.getByText("Room for 2 guests"));

		// Confirmando a reserva
		fireEvent.click(screen.getByText("Confirm Reservation"));

		// Verificando se a modal de sucesso aparece
		expect(
			await screen.findByText("Reservation successful! Your ID is ABC123")
		).toBeInTheDocument();

		// Fechando a modal de sucesso
		fireEvent.click(screen.getByText("Close"));
		expect(
			screen.queryByText("Reservation successful! Your ID is ABC123")
		).not.toBeInTheDocument();
	});
});
