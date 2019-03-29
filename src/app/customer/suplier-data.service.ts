import { InMemoryDbService } from 'angular-in-memory-web-api';

export class SuplierDataService implements InMemoryDbService {
  createDb() {
    let products = [
        {id: 1, name: 'Fibra optica de 24 multimode OM4', um: 'ML', price: 3.53},
        {id: 2, name: 'PATCH PANEL FO 48-SC SX BOX 2U 19" complet echipat cu 48buc adaptori LC Duplex OM4  si 96 buc Pigtail LC OM4', um: 'Buc', price: 378.00},
        {id: 3, name: 'PATCH PANEL FO 12-SC SX BOX 1U 19" complet echipat cu 12buc adaptori LC Duplex OM4 si 24 buc Pigtail LC OM4 ', um: 'Buc', price: 126.00},
       // {id:4, description: 'DUPLEX FIBER PATCH CORD MM LC-LC 1M OM4'},
       // {id:5, description:'DUPLEX FIBER PATCH CORD MM LC-LC 3M OM4'},
        
       //DUPLEX FIBER PATCH CORD MM LC-LC 1M OM4','DUPLEX FIBER PATCH CORD MM LC-LC 3M OM4', 'Sudura fibra optica','PATCH PANEL FO 48-SC SX BOX 2U 19" complet echipat cu 48buc adaptori LC Duplex OM4  si 96 buc Pigtail LC OM4', 'Certificare, masuratori si diagrama Fibra Optica', 'Material marunt'
    ];
    return {products: {
      total: products.length,
      results: products
    }};
  }
}