export class User {
    constructor(public id: number, public name: string, public um: string, public value: number) {}
  }
  
  export interface IUserResponse {
    total: number;
    results: User[];
  }