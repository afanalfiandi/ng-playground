import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import Quill from 'quill';
import 'quill-better-table/dist/quill-better-table.css';
import QuillBetterTable from 'quill-better-table';
import { BetterTableModule } from 'quill-better-table';

Quill.register(
  {
    'modules/better-table': QuillBetterTable,
  },
  true
);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, EditorModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  @ViewChild('editor', { static: true }) editorElement!: ElementRef;
  quill!: Quill;

  ngOnInit() {
    this.quill = new Quill(this.editorElement.nativeElement, {
      theme: 'snow',
      modules: {
        'better-table': {
          operationMenu: {
            items: {
              row_above: { text: 'Insert Row Above' },
              row_below: { text: 'Insert Row Below' },
              col_left: { text: 'Insert Column Left' },
              col_right: { text: 'Insert Column Right' },
              delete_row: { text: 'Delete Row' },
              delete_col: { text: 'Delete Column' },
              delete_table: { text: 'Delete Table' },
            },
            color: 'rgb(0, 0, 0)',
            text: 'white',
          },
        },
        keyboard: {
          bindings: QuillBetterTable.keyboardBindings,
        },
      },
      // formats: [
      //   'background',
      //   'bold',
      //   'italic',
      //   'underline',
      //   'strike',
      //   'table',
      //   'table-cell',
      //   'table-row',
      //   'table-col',
      //   'table-header-cell',
      // ],
    });
  }

  addTable() {
    const tableModule = this.quill.getModule('better-table') as any;
    if (tableModule) {
      const length = this.quill.getLength();
      this.quill.insertText(length - 1, '\n', Quill.sources.USER);
      this.quill.setSelection(length, 0);
      tableModule.insertTable(3, 3);
    }
  }

  setCellBg(color: string) {
    const selection = this.quill.getSelection();
    if (!selection) return;

    const [leaf] = this.quill.getLeaf(selection.index);
    if (!leaf) return;

    let td = leaf.domNode.parentElement as HTMLElement | null;
    while (td && td.tagName !== 'TD') {
      td = td.parentElement;
    }

    if (td) {
      td.style.backgroundColor = color;
      console.log('Cell updated:', td);
    } else {
      console.warn('No table cell (td) found for current selection.');
    }
  }
}
