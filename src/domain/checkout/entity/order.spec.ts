import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {
	it("should throw error when id is empty", () => {
		expect(() => {
			let order = new Order("", "430302198601298152", []);
		}).toThrowError("Id is required");
	});
	
	it("should throw error when customerId is empty", () => {
		expect(() => {
			let order = new Order("74286", "", []);
		}).toThrowError("CustomerId is required");
	});
	
	it("should throw error when items is empty", () => {
		expect(() => {
			let order = new Order("74286", "430302198601298152", []);
		}).toThrowError("Items are required");
	});
	
	it("should calculate total", () => {
		const iphone = new OrderItem("L16ID", "Iphone", 100, "Iphone 11", 2);
		const macbook = new OrderItem("LCR4R", "Macbook", 200, "Macbook Pro 2015", 2);
		const order = new Order("74286", "430302198601298152", [iphone, macbook]);
		let total = order.total();
		
		expect(total).toBe(600);
	});
	
	it("should throw error if the item qte is less or equal zero 0", () => {
		expect(() => {
			const item = new OrderItem("LCR4R", "Iphone", 100, "Iphone 11", 0);
			const order = new Order("22435", "430302198601298152", [item]);
		}).toThrowError("Quantity must be greater than 0");
	});
});