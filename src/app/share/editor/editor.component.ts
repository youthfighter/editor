import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ElectronService } from 'ngx-electron';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  public myEditor: any;
  public obj: any;
  @Input() markdown: string;
  @Input() placeholder: string;

  @Output() onChange = new EventEmitter<any>();
  @Output() onSave = new EventEmitter();
  constructor(private electronService:ElectronService) { }

  ngOnInit() {
    let data = this.markdown;
    let self = this;
    this.myEditor = editormd("editormd", {
      placeholder : "此处开始编写您要发布的内容..." || this.placeholder,
      markdown: data,
      width: "100%",
      height: window.innerHeight-20,
      syncScrolling: "single",
      path: "./assets/editormd/lib/",
      imageUpload: true,
      imageFormats: ["jpg", "jpeg", "gif", "png", "bmp"],
      imageUploadURL: "https://upload.youthfighter.top/editor/image",
      crossDomainUpload: true,
      uploadCallbackURL: 'http://image.youthfighter.top/html/uploadResult.html',
      emoji: false,
      taskList: true,
      tex: false,  // 默认不解析
      flowChart: true,  // 默认不解析
      sequenceDiagram: true,  // 默认不解析SS
      toolbarAutoFixed: true,
      saveHTMLToTextarea: true,
      onload: function() {
        var keyMap = {
          "Ctrl-S": function(cm) {
            self.onSave.emit(self.getMarkdown());
          }
        };
        this.addKeyMap(keyMap);
      },
      onchange: () => {
        this.onChange.emit(this.getMarkdown());
      }
    });

    //一个小bug 全窗口预览关闭按钮初始化没有隐藏（原因未知），手动隐藏
    $(".editormd-preview-close-btn").hide();

    //
    if (this.electronService.isElectronApp) {
      this.electronService.ipcRenderer.on('resize', (event, arg) => {
        this.myEditor.height(arg[1]-80);
        this.myEditor.setCursor(this.myEditor.getCursor());
      });
    }
    console.log(111);
  }

  /**
   * 将子组件获取的内容传输到父组件
   */
  getData() {
    return {
      markdown: this.myEditor.getMarkdown(),
      html: this.myEditor.getHTML()
    }
  }
  getHtml() {
    return this.myEditor.getHTML();
  }
  getMarkdown() {
    return this.myEditor.getMarkdown()
  }
  setMarkdown(markdown: string) {
    this.markdown = markdown;
    console.log(this.myEditor);
    this.myEditor.setMarkdown(markdown);
  }

}
