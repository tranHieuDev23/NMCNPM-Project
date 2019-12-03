import { CartItem } from "ng-shopping-cart";
import Product from './product';
import Category from './category';

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

    static fromJSON(itemData: any): ProductCartItem {
        return new ProductCartItem(
            itemData.productId,
            itemData.productName,
            itemData.productPrice,
            itemData.productImage,
            itemData.quantity
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