import { Sequelize } from "sequelize-typescript";
import Address from "../../../../domain/customer/value-object/address";
import Customer from "../../../../domain/customer/entity/customer";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import Product from "../../../../domain/product/entity/product";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";
import ProductModel from "../../../product/repository/sequelize/product.model";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import ProductRepository from "../../../product/repository/sequelize/product.repository";
import Order from "../../../../domain/checkout/entity/order";
import OrderRepository from "./order.repository";

describe("Order repository test", () => {
	let sequelize: Sequelize;
	beforeEach(async () => {
		sequelize = new Sequelize({
			dialect: "sqlite",
			storage: ":memory:",
			logging: false,
			sync: { force: true },
		});

		await sequelize.addModels([
			CustomerModel,
			OrderModel,
			OrderItemModel,
			ProductModel,
		]);

		await sequelize.sync();
	});

	afterEach(async () => {
		await sequelize.close();
	});

	it("should create a new order", async () => {
		const customerRepository = new CustomerRepository();
		const customer = new Customer("430302198601298152", "Gustavo");
		const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
		customer.changeAddress(address);

		await customerRepository.create(customer);

		const productRepository = new ProductRepository();
		const product = new Product("L16ID", "Iphone X", 10);

		await productRepository.create(product);

		const orderItem = new OrderItem(
			"1",
			product.name,
			product.price,
			product.id,
			2
		);

		const order = new Order("22435", "430302198601298152", [orderItem]);
		const orderRepository = new OrderRepository();

		await orderRepository.create(order);

		const orderModel = await OrderModel.findOne({
			where: { id: order.id },
			include: ["items"],
		});

		expect(orderModel.toJSON()).toStrictEqual({
			id: "22435",
			customer_id: "430302198601298152",
			total: order.total(),
			items: [
				{
					id: orderItem.id,
					name: orderItem.name,
					price: orderItem.price,
					quantity: orderItem.quantity,
					order_id: "22435",
					product_id: "L16ID",
				},
			],
		});
	});
});