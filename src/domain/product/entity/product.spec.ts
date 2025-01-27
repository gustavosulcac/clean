import Product from "./product";

describe("Product unit tests", () => {
	it("should throw error when id is empty", () => {
		expect(() => {
			const product = new Product("", "Iphone 11", 100);
		}).toThrowError("Id is required");
	});

	it("should throw error when name is empty", () => {
		expect(() => {
			const product = new Product("L16ID", "", 100);
		}).toThrowError("Name is required");
	});
	
	it("should throw error when price is less than zero", () => {
		expect(() => {
			const product = new Product("L16ID", "Iphone 11", -1);
		}).toThrowError("Price must be greater than zero");
	});
	
	it("should change name", () => {
		const product = new Product("L16ID", "Iphone 11", 100);
		product.changeName("Iphone 12");
		
		expect(product.name).toBe("Iphone 12");
	});
	
	it("should change price", () => {
		const product = new Product("L16ID", "Iphone 11", 100);
		product.changePrice(150);
		
		expect(product.price).toBe(150);
	});
});