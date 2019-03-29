import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemDataService implements InMemoryDbService {
  createDb() {
    let users = [
      // { id: 1, name: 'Windstorm', value: 1000 },
      // { id: 2, name: 'Bombasto', value: 6000 },
      // { id: 3, name: 'Magneta', value: 8000 },
      // { id: 4, name: 'Tornado', value: 3000 },
      // { id: 5, name: 'Agnosto', value: 4000 },
      {id: 1, name: 'Fibra optica de 24 multimode OM4', um: 'ML', value: 3.53},
        {id: 2, name: 'PATCH PANEL FO 48-SC SX BOX 2U 19" complet echipat cu 48buc adaptori LC Duplex OM4  si 96 buc Pigtail LC OM4', um: 'Buc', value: 378.00},
        {id: 3, name: 'PATCH PANEL FO 12-SC SX BOX 1U 19" complet echipat cu 12buc adaptori LC Duplex OM4 si 24 buc Pigtail LC OM4 ', um: 'Buc', value: 126.00},
        {id:4, name: 'DUPLEX FIBER PATCH CORD MM LC-LC 1M OM4', um: 'BUC', value: 12},
        {id:5, name:'DUPLEX FIBER PATCH CORD MM LC-LC 3M OM4', um: 'BUC', value: 18},
    ];
    return {users: {
      total: users.length,
      results: users
    }};
  }
}