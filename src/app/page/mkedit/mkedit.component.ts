import { Component, OnInit } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { EditorComponent } from 'src/app/share/editor/editor.component';
import { ViewChild } from '@angular/core';
import { md5 } from 'md5';


@Component({
  selector: 'app-mkedit',
  templateUrl: './mkedit.component.html',
  styleUrls: ['./mkedit.component.css']
})
export class MkeditComponent implements OnInit {
  @ViewChild(EditorComponent)
  editor: EditorComponent;
  private ipc: any;
  constructor(private electronService: ElectronService) {
    this.ipc = this.electronService.ipcRenderer;
  }

  ngOnInit() {
    if (this.electronService.isElectronApp) {
      this.electronService.ipcRenderer.on('openMarkdown', (event, markdown) => {
        console.log('openMarkdown', markdown)
        this.editor.setMarkdown(markdown);
      });
      this.ipc.on('saveMarkdown', (event) => {
        console.log('saveMarkdown')
        this.ipc.send('saveMarkdown', this.editor.getMarkdown());
      })
      this.ipc.on('saveAsMarkdown', (event) => {
        console.log('saveAsMarkdown')
        this.ipc.send('saveAsMarkdown', this.editor.getMarkdown());
      })
      this.ipc.on('newMarkdown', (event) => {
        this.editor.setMarkdown('');
      })
    }
  }
  markdownChange() {

  }
  onLoad() {
    if (this.electronService.isElectronApp) {
      this.ipc.send('initMarkdown');
    }    
  }
  saveMarkdown() {
    if (this.electronService.isElectronApp) {
      this.ipc.send('saveMarkdown', this.editor.getMarkdown());
    }
  }
}
