class ProductDetail {
    constructor(
        private productId: number,
        private information: string,
        private image1: string,
        private image2: string,
        private image3: string,
        private image4: string,
        private image5: string,
        private accessories: string,
        private guaranty: string
    ) { }

    public getProductId(): number { return this.productId; }
    public getInformation(): string { return this.information; }
    public getImage1(): string { return this.image1; }
    public getImage2(): string { return this.image2; }
    public getImage3(): string { return this.image3; }
    public getImage4(): string { return this.image4; }
    public getImage5(): string { return this.image5; }
    public getAccessories(): string { return this.accessories; }
    public getGuaranty(): string { return this.guaranty; }
}

export default ProductDetail;