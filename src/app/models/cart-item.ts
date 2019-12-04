import { CartItem } from "ng-shopping-cart";
import Product from './product';

class ProductCartItem extends CartItem {

    constructor(
        private productId: number,
        private productName: string,
        private productPrice: number,
        private productImage: string,
        private quantity: number
    ) {
        super();
    }

    static fromProduct(product: Product, quantity: number = 0): ProductCartItem {
        return new ProductCartItem(
            product.getProductId(),
            product.getName(),
            product.getPrice(),
            product.getImage(),
            quantity
        );
    }

    static fromJSON(data: any): ProductCartItem {
        if (data == null || data == undefined)
            return null;
        return new ProductCartItem(
            data.productId,
            data.productName,
            data.productPrice,
            data.productImage,
            data.quantity
        );
    }

    getId(): number {
        return this.productId;
    }    
    
    getName(): string {
        return this.productName;
    }

    getPrice(): number {
        return this.productPrice;
    }

    setQuantity(quantity: number): void {
        this.quantity = quantity;
    }

    getQuantity(): number {
        return this.quantity;
    }

    getImage(): string {
        return this.productImage;
    }
}

export default ProductCartItem;