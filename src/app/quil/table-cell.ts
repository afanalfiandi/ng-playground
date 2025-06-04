import Quill from 'quill';

interface BlotClass {
  new (...args: any[]): any;
  create(value?: any): HTMLElement;
  formats(domNode: HTMLElement): any;
}

const TableCell = Quill.import('formats/table-cell') as unknown as BlotClass;

export class TableCellBackground extends (TableCell as any) {
  static create(value: string) {
    const node = super.create(value);
    if (value) {
      node.style.backgroundColor = value;
    }
    return node;
  }

  static formats(domNode: HTMLElement) {
    return domNode.style.backgroundColor || '';
  }

  format(name: string, value: string) {
    if (name === 'table-cell-background') {
      if (value) {
        this['domNode'].style.backgroundColor = value;
      } else {
        this['domNode'].style.removeProperty('background-color');
      }
    } else {
      super.format(name, value);
    }
  }
}

TableCellBackground['blotName'] = 'table-cell';
TableCellBackground['tagName'] = 'TD';

Quill.register(TableCellBackground, true);
