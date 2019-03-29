import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface ProjectSourceItem {
  Descriere: string;
  NrCrt: number;
  UM: string;
  Unitati: number;
  PretUnitar: number;
  PretTotalFaraTVA: number;
  //PretTotalCuTva: number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: ProjectSourceItem[] = [
  {NrCrt: 1, Descriere: 'Fibra optica de 24 multimode OM4', UM: 'ML', Unitati: 4000, PretUnitar: 3.53, PretTotalFaraTVA: 14112.00 },
  {NrCrt: 2, Descriere: 'PATCH PANEL FO 48-SC SX BOX 2U 19" complet echipat cu 48buc adaptori LC Duplex OM4  si 96 buc Pigtail LC OM4', UM: 'Buc', Unitati: 4, PretUnitar: 378.00, PretTotalFaraTVA: 1512.00 },
  {NrCrt: 3, Descriere: 'PATCH PANEL FO 12-SC SX BOX 1U 19" complet echipat cu 12buc adaptori LC Duplex OM4 si 24 buc Pigtail LC OM4 ', UM: 'Buc', Unitati: 14, PretUnitar: 126.00, PretTotalFaraTVA: 1764.00 },
  {NrCrt: 4, Descriere: 'DUPLEX FIBER PATCH CORD MM LC-LC 1M OM4 ', UM: 'Buc', Unitati: 168, PretUnitar: 6.94, PretTotalFaraTVA: 1166.59 },
  {NrCrt: 5, Descriere: 'DUPLEX FIBER PATCH CORD MM LC-LC 3M OM4 ', UM: 'Buc', Unitati: 168, PretUnitar: 8.74, PretTotalFaraTVA: 1467.65 },
  {NrCrt: 6, Descriere: 'Sudura fibra optica', UM: 'SER', Unitati: 672, PretUnitar: 5.00, PretTotalFaraTVA: 3360.00 },
  {NrCrt: 7, Descriere: 'Certificare, masuratori si diagrama Fibra Optica', UM: 'Buc', Unitati: 336, PretUnitar: 2.50, PretTotalFaraTVA: 840.00 },
  {NrCrt: 8, Descriere: 'Material marunt', UM: 'Ans', Unitati: 1, PretUnitar: 420.00, PretTotalFaraTVA: 14112.00 },
];

/**
 * Data source for the ProjectSource view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ProjectSourceDataSource extends DataSource<ProjectSourceItem> {
  data: ProjectSourceItem[] = EXAMPLE_DATA;

  constructor(private paginator: MatPaginator, private sort: MatSort) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<ProjectSourceItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginator's length
    this.paginator.length = this.data.length;

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: ProjectSourceItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: ProjectSourceItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'Descriere': return compare(a.Descriere, b.Descriere, isAsc);
        case 'NrCrt': return compare(+a.NrCrt, +b.NrCrt, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
