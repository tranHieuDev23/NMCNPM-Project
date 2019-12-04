class Customer {
    constructor(
        private customerId: number,
        private name: string,
        private email: string,
        private phone: string,
        private address: string,
        private cityRegion: string
    ) { }

    public getCustomerId(): number { return this.customerId; }
    public getName(): string { return this.name; }
    public getEmail(): string { return this.email; }
    public getPhone(): string { return this.phone; }
    public getAddress(): string { return this.address; }
    public getCityRegion(): string { return this.cityRegion; }

    static fromJSON(data: any): Customer {
        if (data == null || data == undefined)
            return null;
        return new Customer(
            data.customerId,
            data.name,
            data.email,
            data.phone,
            data.address,
            data.cityRegion
        );
    }
}

export default Customer;