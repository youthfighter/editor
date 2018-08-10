import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-result',
  templateUrl: './upload-result.component.html',
  styleUrls: ['./upload-result.component.css']
})
export class UploadResultComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let query = {dialog_id: '', url: ''};
    let urlParams = unescape(window.location.search.split('?')[1]);
    let urlParamsArr = urlParams.split("&");
    for (var i = 0; i< urlParamsArr.length; i++) {
        var param = urlParamsArr[i].split("="); 
        query[param[0]] = param[1]; 
    }
    let dialog = window.parent.document.getElementById(query['dialog_id']);
    (dialog.querySelector('input[data-url]') as any).value = query.url
  }

}
