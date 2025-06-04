declare module 'quill-better-table' {
  import { Module } from 'quill';

  export interface BetterTableModule extends Module {
    insertTable(rows: number, columns: number): void;
    // Tambah method lain sesuai kebutuhan
  }

  const QuillBetterTable: {
    new (...args: any[]): BetterTableModule;
    keyboardBindings: any;
  };

  export default QuillBetterTable;
}
