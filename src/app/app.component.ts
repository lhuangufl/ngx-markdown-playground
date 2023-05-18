import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  angularVersion = VERSION.full;
  ngxMarkdownVersion = '16.0.0';

  markdown = `

  | Column 1 | Column 2   | Column 3                    | Column 4                |
  | -------- | ---------- | --------------------------- | ----------------------- |
  | 4.2.5    | 4.2.5.1    | FRTB Financial Topic        | Rule related to FRTB     |
  |   |   | | Another rule related to FRTB |
  |   |   | | ![Alt Text](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf7Q3xKebsZM5cmlyvTBtcboCmdQkao-IxHOYK_wlu2g&s) |
  |   |   | |  |
  `;
}
