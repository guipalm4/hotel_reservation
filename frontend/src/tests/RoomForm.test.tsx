import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import RoomForm from "../components/RoomForm";

describe("RoomForm Component with Modal", () => {
	test("submits the form with success and shows modal", async () => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				json: () => Promise.resolve({ id: "123" }),
			})
		) as jest.Mock;

		render(<RoomForm />);

		const bedsInput = screen.getByLabelText("Beds:") as HTMLInputElement;
		const breakfastCheckbox = screen.getByLabelText(
			"Breakfast included:"
		) as HTMLInputElement;
		const guestsInput = screen.getByLabelText(
			"Number of Guests:"
		) as HTMLInputElement;
		const priceInput = screen.getByLabelText("Price (R$):") as HTMLInputElement;
		const submitButton = screen.getByRole("button", { name: /Create Room/i });

		// Preenchendo o formulário
		fireEvent.change(bedsInput, { target: { value: 2 } });
		fireEvent.change(guestsInput, { target: { value: 3 } });
		fireEvent.change(priceInput, { target: { value: 150.5 } });
		fireEvent.click(breakfastCheckbox);

		// Submetendo o formulário
		fireEvent.click(submitButton);

		// Verifica se a modal de sucesso é exibida
		expect(
			await screen.findByText("Room created with ID: 123")
		).toBeInTheDocument();

		// Fechando a modal
		const closeButton = screen.getByRole("button", { name: /Close/i });
		fireEvent.click(closeButton);
		expect(
			screen.queryByText("Room created with ID: 123")
		).not.toBeInTheDocument();
	});

	test("handles form submission failure and shows modal", async () => {
		global.fetch = jest.fn(() =>
			Promise.reject(new Error("Error creating room"))
		) as jest.Mock;

		render(<RoomForm />);

		const submitButton = screen.getByRole("button", { name: /Create Room/i });

		// Simulando o clique no botão de submissão
		fireEvent.click(submitButton);

		// Verifica se a modal de erro é exibida
		expect(await screen.findByText("Error creating room")).toBeInTheDocument();

		// Fechando a modal
		const closeButton = screen.getByRole("button", { name: /Close/i });
		fireEvent.click(closeButton);
		expect(screen.queryByText("Error creating room")).not.toBeInTheDocument();
	});
});
