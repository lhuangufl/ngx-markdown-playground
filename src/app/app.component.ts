import { Component, VERSION } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  angularVersion = VERSION.full;
  ngxMarkdownVersion = '16.0.0';
  constructor(private http: HttpClient) {}
  ngOnInit() {
    this.http
      .get('../assets/data.md', { responseType: 'text' })
      .subscribe((data) => {
        this.markdown = data;
      });
  }
  markdown: string;
}
