export class Suplier {
    constructor(public id: number,
        public name: string,
        public um: string,
        public price: number
        ) {}
  }
  
  export interface IProductsResponse {
    total: number;
    results: Suplier[];
  }