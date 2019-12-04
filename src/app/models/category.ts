class Category {
    constructor(
        private categoryId: number,
        private name: string,
        private image: string
    ) { }

    public getCategoryId(): number { return this.categoryId; }
    public getName(): string { return this.name; }
    public getImage(): string { return this.image; }

    static fromJSON(data: any): Category {
        if (data == null || data == undefined)
            return null;
        return new Category(
            data.categoryId,
            data.name,
            data.image
        );
    }
}

export default Category;