class Admin {
  constructor(
    private adminId: number,
    private username: string,
    private email: string,
    private phone: string
  ) {}

  public getAdminId(): number {
    return this.adminId;
  }

  public getUsername(): string {
    return this.username;
  }

  public getEmail(): string {
    return this.email;
  }

  public getPhone(): string {
    return this.phone;
  }

  static fromJSON(data: any): Admin {
    if (!data) {
      return null;
    }
    return new Admin(
      data.adminId,
      data.username,
      data.email,
      data.phone
    )
  }
}

export default Admin;