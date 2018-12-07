import { Component } from '@angular/core';
import * as showdown from 'showdown';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  about = false;
  public text  = ``;
 htmltext = '';
 selectedtext = '';
 textFile = null;
 ptext = '';
 // showdown: any;
 cv = new showdown.Converter();

  constructor() {}

  showAbout() {
    this.about = true;
  }

  hideAbout() {
    this.about = false;
  }

 doTextareaValueChange(ev) {
  try {
    this.text = ev.target.value;
    console.log(this.text);
     this.htmltext = this.cv.makeHtml(this.text);
    console.log(this.htmltext);
//    document.querySelector('HTMLtext').innerHTML = this.htmltext;
    document.querySelector('h4').innerText = this.htmltext;

  } catch (ev) {
    console.log('Error');
}
}

refresh() {
  const ta = <HTMLInputElement> document.querySelector('#mdtext');
  this.htmltext = this.cv.makeHtml(this.text);
  document.querySelector('h4').innerText = this.htmltext;
}


selectText() {
  if (window.getSelection) {
    this.selectedtext = window.getSelection().toString();
}
console.log('Selected:' + this.selectedtext);
}

copy() {
  this.selectText();
  document.execCommand('copy');
}

cut() {
  this.selectText();
  document.execCommand('cut');
    // this.text = this.text.replace(this.selectedtext, '');

}

paste() {
  const ta = <HTMLInputElement> document.querySelector('#mdtext');
  const n = ta.selectionStart;
  console.log(n);
  console.log('text:' + this.text);
  let temp = this.text.substr(0, n);
  console.log('startstr:' + temp);
  console.log('selected:' + this.selectedtext);
  temp = temp + this.selectedtext;
  console.log('Remaining:' + this.text.substr(  n , this.text.length - n ) );
  temp = temp + this.text.substr(n , this.text.length);
  this.text = temp;
  console.log(this.text);
  ta.value = this.text;
}

selectAll() {
  const ref = <HTMLInputElement> document.getElementById('mdtext');
  ref.select();
}

close() {
  window.close();
}



saveMarkdownAsText() {
  this.refresh();
  const blob = new Blob([this.text], {type: 'text/plain;charset=utf-8'});
  saveAs(blob, 'markdown.txt');
}


saveHtmlAsText() {
  this.refresh();
  const blob = new Blob([this.htmltext], {type: 'text/plain;charset=utf-8'});
  saveAs(blob, 'html.txt');
}

saveHtmlAsHtml() {
  this.refresh();
  const blob = new Blob([this.htmltext], {type: 'text/html;charset=utf-8'});
  saveAs(blob, 'data.html');
}

saveMarkdownAsMarkdown() {
  this.refresh();
  const blob = new Blob([this.text], {type: 'text/markdown;charset=utf-8'});
  saveAs(blob, 'data.md');
}


}
