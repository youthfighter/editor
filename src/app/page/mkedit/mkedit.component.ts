import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { EditorComponent } from 'src/app/share/editor/editor.component';
import { ViewChild } from '@angular/core';


@Component({
  selector: 'app-mkedit',
  templateUrl: './mkedit.component.html',
  styleUrls: ['./mkedit.component.css']
})
export class MkeditComponent implements OnInit {
  markdown: string = '123';
  @ViewChild(EditorComponent)
  editor: EditorComponent;
  constructor(private electronService: ElectronService) { }

  ngOnInit() {
    if (this.electronService.isElectronApp) {
      this.electronService.ipcRenderer.on('openMarkdown', (event, markdown) => {
        this.editor.setMarkdown(markdown);
      });
    }
  }
  markdownChange() {}
  saveMarkdown(markdown: string) {
    console.log('onsave', markdown);
    if (this.electronService.isElectronApp) {
      this.electronService.ipcRenderer.send('saveMarkdown', markdown);
    }
  }
}
