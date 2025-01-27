import { Sequelize } from "sequelize-typescript";
import ProductRepository from "./product.repository";
import ProductModel from "./product.model";
import Product from "../../../../domain/product/entity/product";

describe("Product repository test", () => {
	let sequileze: Sequelize;

	beforeEach(async () => {
		sequileze = new Sequelize({
			dialect: "sqlite",
			storage: ":memory:",
			logging: false,
			sync: { force: true },
		});

		sequileze.addModels([ProductModel]);

		await sequileze.sync();
	});

	afterEach(async () => {
		await sequileze.close();
	});

	it("should create a product", async () => {
		const productRepository = new ProductRepository();
		const product = new Product("1", "Iphone X", 100);
		
		await productRepository.create(product);
		
		const productModel = await ProductModel.findOne({ where: { id: "1" } });
		
		expect(productModel.toJSON()).toStrictEqual({
			id: "1",
			name: "Iphone X",
			price: 100,
		});
	});
	
	it("should update a product", async () => {
		const productRepository = new ProductRepository();
		const product = new Product("1", "Iphone X", 100);
		
		await productRepository.create(product);
		
		const productModel = await ProductModel.findOne({ where: { id: "1" } });
		
		expect(productModel.toJSON()).toStrictEqual({
			id: "1",
			name: "Iphone X",
			price: 100,
		});
		
		product.changeName("Iphone 11");
		product.changePrice(200);
		
		await productRepository.update(product);
		
		const productModelUpdated = await ProductModel.findOne({ where: { id: "1" } });
		
		expect(productModelUpdated.toJSON()).toStrictEqual({
			id: "1",
			name: "Iphone 11",
			price: 200,
		});
	});
	
	it("should find a product", async () => {
		const productRepository = new ProductRepository();
		const product = new Product("1", "Iphone X", 100);
		
		await productRepository.create(product);
		
		const productModel = await ProductModel.findOne({ where: { id: "1" } });
		const foundProduct = await productRepository.find("1");
		
		expect(productModel.toJSON()).toStrictEqual({
			id: foundProduct.id,
			name: foundProduct.name,
			price: foundProduct.price,
		});
	});
	
	it("should find all products", async () => {
		const productRepository = new ProductRepository();
		const iphoneX = new Product("1", "Iphone X", 100);
		
		await productRepository.create(iphoneX);
		
		const iphone11 = new Product("2", "Iphone 11", 200);
		
		await productRepository.create(iphone11);
		
		const foundProducts = await productRepository.findAll();
		const products = [iphoneX, iphone11];
		
		expect(products).toEqual(foundProducts);
	});
});