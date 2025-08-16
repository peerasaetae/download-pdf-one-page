import { Component } from '@angular/core';
import { PdfExportComponent } from './pdf-export/pdf-export.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PdfExportComponent],
  template: `
    <div class="container">
      <h1>Chart PDF Export POC</h1>
      <app-pdf-export></app-pdf-export>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
    h1 {
      text-align: center;
      color: #333;
      margin-bottom: 30px;
    }
  `]
})
export class AppComponent {
  title = 'chart-pdf-export-poc';
}