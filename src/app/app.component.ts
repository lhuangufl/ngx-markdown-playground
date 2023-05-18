import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  markdown: string = '';

  constructor(private http: HttpClient) {} // Inject HttpClient here

  ngOnInit() {
    console.log('ngOnInit');
    this.readFile('assets/data.txt');
  }

  private readFile(filepath: string): void {
    this.http.get(filepath, { responseType: 'text' }).subscribe(
      (data) => {
        console.log(data);
        this.markdown = data;
      },
      (error: any) => {
        console.error('Error occurred while reading the file:', error);
      }
    );
  }
}
