export class Room {
	constructor(
		public id: string,
		public beds: number,
		public breakfast: boolean,
		public guests: number,
		public balcony: boolean,
		public price: number,
		public available: boolean
	) {}

	markAsUnavailable() {
		this.available = false;
	}
}
