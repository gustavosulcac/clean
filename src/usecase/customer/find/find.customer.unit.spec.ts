import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

const customer = new Customer("430302198601298152", "Gustavo");
const address = new Address("Street", 123, "Zip", "City");
customer.changeAddress(address);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit Test find customer use case", () => {
  it("should find a customer", async () => {
    const customerRepository = MockRepository();
    const usecase = new FindCustomerUseCase(customerRepository);
    
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