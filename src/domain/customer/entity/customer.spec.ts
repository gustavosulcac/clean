import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer unit tests", () => {
	it("should throw error when id is empty", () => {
		expect(() => {
			let customer = new Customer("", "Gustavo");
		}).toThrowError("Id is required");
	});

	it("should throw error when name is empty", () => {
		expect(() => {
			let customer = new Customer("430302198601298152", "");
		}).toThrowError("Name is required");
	});

	it("should change name", () => {
		// Arrange
		const customer = new Customer("430302198601298152", "Gustavo");

		// Act
		customer.changeName("Williams");

		// Assert
		expect(customer.name).toBe("Williams");
	});

	it("should activate customer", () => {
		const customer = new Customer("1", "Gustavo")
		const address = new Address("Street 1", 123, "13330-250", "São Paulo");
		customer.address = address;
		customer.activate();

		expect(customer.isActive()).toBe(true);
	});

	it("should throw error when address is undefined when you activate a customer", () => {
		expect(() => {
			const customer = new Customer("1", "Gustavo")
			customer.activate();
		}).toThrowError("Address is mandatory to activate a customer");
	});

	it("should deactivate customer", () => {
		const customer = new Customer("1", "Gustavo")
		customer.deactivate();

		expect(customer.isActive()).toBe(false);
	});

	it("should add reward points", () => {
		const customer = new Customer("430302198601298152", "Gustavo")

		expect(customer.rewardPoints).toBe(0);

		customer.addRewardPoints(10);

		expect(customer.rewardPoints).toBe(10);

		customer.addRewardPoints(10);

		expect(customer.rewardPoints).toBe(20);
	});
});