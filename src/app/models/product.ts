import ProductDetail from './product-detail';
import Category from './category';

class Product {
    constructor(
        public productId: number,
        public name: string,
        public price: number,
        public description: string,
        public descriptionDetail: string,
        public image: string,
        public thumbImage: string,
        public lastUpdate: Date,
        public category: Category,
        public detail: ProductDetail
    ) { }

    public getProductId(): number { return this.productId; }
    public getName(): string { return this.name; }
    public getPrice(): number { return this.price; }
    public getDescription(): string { return this.description; }
    public getDescriptionDetail(): string { return this.descriptionDetail; }
    public getImage(): string { return this.image; }
    public getThumbImage(): string { return this.thumbImage; }
    public getLastUpdate(): Date { return this.lastUpdate; }
    public getCategory(): Category { return this.category; }
    public getDetail(): ProductDetail { return this.detail; }

    static fromJSON(data: any): Product {
        if (data == null || data == undefined)
            return null;
        return new Product(
            data.productId,
            data.name,
            data.price,
            data.description,
            data.descriptionDetail,
            data.image,
            data.thumbImage,
            data.lastUpdate,
            Category.fromJSON(data.category),
            ProductDetail.fromJSON(data.detail)
        );
    }
}

export default Product;