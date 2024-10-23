import Product from "../entity/product";
import ProductService from "./product.service";

describe("Product service unit tests", () => {
    it("should change the prices of all products", () => {
        const iphone = new Product("L16ID", "Iphone 11", 10);
        const macbook = new Product("LCR4R", "Macbook Pro 2015", 20);
        const products = [iphone, macbook];
        
				ProductService.increasePrice(products, 100);
        
				expect(iphone.price).toBe(20);
        expect(macbook.price).toBe(40);
    });
});