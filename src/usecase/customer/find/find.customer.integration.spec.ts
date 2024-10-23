import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import FindCustomerUseCase from "./find.customer.usecase";

describe("Test find customer use case", () => {
	let sequelize: Sequelize;
	
	beforeEach(async () => {
		sequelize = new Sequelize({
			dialect: "sqlite",
			storage: ":memory:",
			logging: false,
			sync: { force: true },
		});
		
		await sequelize.addModels([CustomerModel]);
		await sequelize.sync();
	});
	
	afterEach(async () => {
		await sequelize.close();
	});

	it("should find a customer", async () => {
		const customerRepository = new CustomerRepository();
		const usecase = new FindCustomerUseCase(customerRepository);

		const customer = new Customer("430302198601298152", "Gustavo");
		const address = new Address("Street", 123, "Zip", "City");
		customer.changeAddress(address);

		await customerRepository.create(customer);
		
		const input = {
			id: "430302198601298152",
		};
		
		const output = {
			id: "430302198601298152",
			name: "Gustavo",
			address: {
				street: "Street",
				city: "City",
				number: 123,
				zip: "Zip",
			},
		};
		
		const result = await usecase.execute(input);
		
		expect(result).toEqual(output);
	});
});