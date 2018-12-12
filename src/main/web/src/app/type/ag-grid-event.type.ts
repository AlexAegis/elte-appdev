import { GridApi, ColumnApi } from 'ag-grid-community';

/**
 * TODO: Should this be a .d.ts file?
 */
export interface GridEvent {
	api: GridApi;
	columnApi: ColumnApi;
	type: string;
}
