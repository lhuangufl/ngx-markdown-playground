import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  markdown: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const repository = 'lhuangufl/ngx-markdown-playground';
    const filePath = 'README.md';
    const textPath = 'text1.txt';
    const url = `https://api.github.com/repos/${repository}/contents/${filePath}`;
    const txturl = `https://api.github.com/repos/${repository}/contents/${textPath}`;
    this.http.get(url).subscribe(
      (response: any) => {
        const content = response.content;

        this.markdown = atob(content); // Decode base64 content
      },
      (error: any) => {
        console.error('Error occurred while reading the file:', error);
      }
    );
    this.http.get(txturl).subscribe(
      (response: any) => {
        const content = response.content;

        const filename = atob(content).replace(/\n/g, '<br>');
        console.log(filename);
        this.markdown = this.markdown.replace('${filename}', filename);
        console.log(this.markdown);
      },
      (error: any) => {
        console.error('Error occurred while reading the file:', error);
      }
    );
  }
}
