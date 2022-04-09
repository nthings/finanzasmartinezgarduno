import { Component } from '@angular/core';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 file: any
 fileParsed: any

 constructor(private ngxCsvParser: NgxCsvParser) {}

 excelSubido(e:any) {
   this.file = e.target.files[0]
   const fileReader = new FileReader()
   fileReader.onload = (f:any) => {
    this.ngxCsvParser.parse(this.file, { header: true, delimiter: ',' })
    .pipe().subscribe({
      next: (result): void => {
        console.log('Result', result);
        this.fileParsed = result;
      },
      error: (error: NgxCSVParserError): void => {
        console.log('Error', error);
      }
    });
   }
   fileReader.readAsText(this.file)
 }

}
