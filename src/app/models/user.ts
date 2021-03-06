enum UserRole {
  USER,
  ADMIN
}

class User {
  constructor(
    private userId: number,
    private username: string,
    private name: string,
    private email: string,
    private phone: string,
    private address: string,
    private role: UserRole
  ) {}

  public getUserId(): number {
    return this.userId;
  }

  public getUsername(): string {
    return this.username;
  }

  public getName(): string {
    return this.name;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPhone(): string {
    return this.phone;
  }

  public getAddress(): string {
    return this.address;
  }

  public getRole(): UserRole {
    return this.role;
  }

  static fromJSON(data: any): User {
    if (!data) {
      return null;
    }
    return new User(
      data.userId,
      data.username,
      data.name,
      data.email,
      data.phone,
      data.address,
      data.role
    );
  }
}

export default User;

export { UserRole };
