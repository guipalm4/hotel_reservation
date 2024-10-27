import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Checkin from "../pages/Checkin";

describe("Checkin Component", () => {
	// Testando a renderização do formulário
	test("renders Checkin form correctly", () => {
		render(<Checkin />);
		expect(
			screen.getByRole("heading", { name: /Check-in/i })
		).toBeInTheDocument();
		expect(screen.getByLabelText("ID number:")).toBeInTheDocument();
		expect(screen.getByLabelText("Reservation ID:")).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /Check-in/i })
		).toBeInTheDocument();
	});

	// Testando o estado inicial dos inputs
	test("initial state is empty for cpf and reservationId", () => {
		render(<Checkin />);
		const cpfInput = screen.getByLabelText("ID number:") as HTMLInputElement;
		const reservationIdInput = screen.getByLabelText(
			"Reservation ID:"
		) as HTMLInputElement;

		expect(cpfInput.value).toBe("");
		expect(reservationIdInput.value).toBe("");
	});

	// Testando a entrada de dados nos campos de CPF e Reservation ID
	test("allows input of cpf and reservationId", async () => {
		render(<Checkin />);

		const cpfInput = screen.getByLabelText("ID number:") as HTMLInputElement;
		const reservationIdInput = screen.getByLabelText(
			"Reservation ID:"
		) as HTMLInputElement;

		await userEvent.type(cpfInput, "123456789"); // Adicionando await
		await userEvent.type(reservationIdInput, "ABC123"); // Adicionando await

		expect(cpfInput.value).toBe("123456789");
		expect(reservationIdInput.value).toBe("ABC123");
	});

	// Testando a submissão com sucesso
	test("successful check-in triggers success state", async () => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				json: () => Promise.resolve({ success: true }),
			})
		) as jest.Mock;

		render(<Checkin />);

		const cpfInput = screen.getByLabelText("ID number:");
		const reservationIdInput = screen.getByLabelText("Reservation ID:");
		const checkinButton = screen.getByRole("button", { name: /Check-in/i });

		fireEvent.change(cpfInput, { target: { value: "123456789" } });
		fireEvent.change(reservationIdInput, { target: { value: "ABC123" } });
		fireEvent.click(checkinButton);

		expect(await screen.findByText("Check-in successful!")).toBeInTheDocument();
	});

	// Testando a submissão com falha
	test("check-in fails with invalid CPF or reservation ID", async () => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				json: () => Promise.resolve({ success: false }),
			})
		) as jest.Mock;

		render(<Checkin />);

		const cpfInput = screen.getByLabelText("ID number:");
		const reservationIdInput = screen.getByLabelText("Reservation ID:");
		const checkinButton = screen.getByRole("button", { name: /Check-in/i });

		fireEvent.change(cpfInput, { target: { value: "invalid_cpf" } });
		fireEvent.change(reservationIdInput, { target: { value: "invalid_id" } });
		fireEvent.click(checkinButton);

		expect(
			await screen.findByText("Invalid CPF or reservation ID")
		).toBeInTheDocument();
	});
});
