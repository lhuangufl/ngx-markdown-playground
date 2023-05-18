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
    const url = `https://api.github.com/repos/${repository}/contents/${filePath}`;

    this.http.get(url).subscribe(
      (response: any) => {
        const content = response.content;
        this.markdown = atob(content); // Decode base64 content
      },
      (error: any) => {
        console.error('Error occurred while reading the file:', error);
      }
    );
  }
}
