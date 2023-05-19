import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FileAttachment } from '@observablehq/stdlib';
import * as Plot from '@observablehq/plot';
import $ from 'jquery';
import { map } from 'rxjs/operators';
import mermaid from 'mermaid';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  markdown_origin: string = '';
  markdown: string = '';
  chartRef;
  data;
  svg;
  timer;
  update() {
    this.plot();
  }

  constructor(private http: HttpClient) {}

  ngAfterViewInit() {
    this.chartRef = $('.chart');

    //
    // mermaid.initialize({
    //   startOnLoad: true,
    //   flowchart: {
    //     useMaxWidth: true,
    //     htmlLabels: true,
    //     curve: 'cardinal',
    //   },
    //   securityLevel: 'loose',
    // });

    // const element: any = this.mermaidDiv.nativeElement;
    // const graphDefinition = `graph TD
    //   A[Christmas] -->|Get money| B(Go shopping)
    //   B --> C(Let me think)
    //   C -->|One| D[Laptop]
    //   C -->|Two| E[iPhone]
    //   C -->|Three| F[fa:fa-car Car]
    //   A[Christmas] -->|Get money| D[Laptop]
    //   B --> E`;

    // mermaid.render('mermaidDiv', graphDefinition);
  }

  async ngOnInit() {
    const repository = 'lhuangufl/ngx-markdown-playground';
    const filePath = 'README.md';
    const textPath = 'text1.txt';
    const url = `https://api.github.com/repos/${repository}/contents/${filePath}`;
    const txturl = `https://api.github.com/repos/${repository}/contents/${textPath}`;

    this.http.get(url).subscribe(
      (response: any) => {
        const content = response.content;

        this.markdown_origin = atob(content); // Decode base64 content
      },
      (error: any) => {
        console.error('Error occurred while reading the file:', error);
      }
    );

    this.http.get(txturl).subscribe(
      (response: any) => {
        const content = response.content;

        const filename = atob(content).replace(/\n/g, '<br>');
        this.markdown = this.markdown_origin.replace('${filepath}', filename);
      },
      (error: any) => {
        console.error('Error occurred while reading the file:', error);
      }
    );

    await this.fetchData();
    this.plot();
  }

  fetchData(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.http
        .get('./assets/data.csv', { responseType: 'text' })
        .pipe(
          map((response: string) => {
            const rows = response.split('\n');
            const headers = rows[0].split(',');

            // Parse each row as an object
            return rows.slice(1).map((row) => {
              const values = row.split(',');
              const date = values[0];
              const value = parseFloat(values[1]);

              return {
                date,
                value,
              };
            });
          })
        )
        .subscribe(
          (data) => {
            this.data = data;
            resolve(); // Resolve the Promise when data is assigned
          },
          (error) => {
            reject(error); // Reject the Promise if there's an error
          }
        );
    });
  }

  plot() {
    const svg = Plot.plot({
      style: {
        background: 'transparent',
      },
      y: {
        grid: true,
      },
      color: {
        type: 'diverging',
        scheme: 'burd',
      },
      marks: [Plot.dot(this.data, { x: 'date', y: 'value' })],
    });

    this.chartRef.html(svg);
  }
}
