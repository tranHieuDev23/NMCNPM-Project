class Category {
    constructor(
        private categoryId: number,
        private name: string,
        private image: string
    ) { }

    public getCategoryId(): number { return this.categoryId; }
    public getName(): string { return this.name; }
    public getImage(): string { return this.image; }
}

export default Category;