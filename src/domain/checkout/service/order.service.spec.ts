import Customer from '../../customer/entity/customer';
import Order from '../entity/order';
import OrderItem from '../entity/order_item';
import OrderService from './order.service';

describe("Order service unit tets", () => {
	it("should place an order", () => {
		const customer = new Customer("430302198601298152", "Gustavo");
		const item = new OrderItem("L16ID", "Iphone", 10, "Iphone 11", 1);
		const order = OrderService.placeOrder(customer, [item]);
		
		expect(customer.rewardPoints).toBe(5);
		expect(order.total()).toBe(10);
	});

	it("should get total of all orders", () => {
		const iphone = new OrderItem("L16ID", "Iphone", 100, "Iphone 11", 1);
		const macbook = new OrderItem("LCR4R", "Macbook", 200, "Macbook Pro 2015", 2);
		const orderIphone = new Order("430302198", "430302198601298152", [iphone]);
		const orderMacbook = new Order("430302100", "430302198601298152", [macbook]);
		
		const total = OrderService.total([orderIphone, orderMacbook]);
		
		expect(total).toBe(500);
	});
});