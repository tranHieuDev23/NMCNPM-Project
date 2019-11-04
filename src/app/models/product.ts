import ProductDetail from './product-detail';
import Category from './category';

class Product {
    constructor(
        private productId: number,
        private name: string,
        private price: number,
        private description: string,
        private descriptionDetail: string,
        private image: string,
        private thumbImage: string,
        private lastUpdate: Date,
        private category: Category,
        private detail: ProductDetail
    ) { }

    public getProductId(): number { return this.productId; }
    public getName(): string { return this.name; }
    public getPrice(): number { return this.price; }
    public getDescription(): string { return this.description; }
    public getImage(): string { return this.descriptionDetail; }
    public getThumbImage(): string { return this.image; }
    public getLastUpdate(): Date { return this.lastUpdate; }
    public getCategory(): Category { return this.category; }
    public getDetail(): ProductDetail { return this.detail; }
}

export default Product;