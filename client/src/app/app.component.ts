import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  pdfs: any
  constructor(private http: HttpClient, private el: ElementRef) {}
  ngOnInit() {
    this.http.get('/video').subscribe(pdfs => {
      if (pdfs) {
        this.pdfs = pdfs
        console.log(this.pdfs)
      } else {
        console.log("Error")
      }
    })
  }
  upload() {
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo')
    let fileCount: number = inputEl.files.length
    let formData = new FormData()
    if (fileCount > 0) {
      formData.append('photo', inputEl.files.item(0))
      this.http.post('/upload', formData).subscribe(err => {
        if (err) {
          console.log(err)
        } else {
          console.log("Success")
        }
       })
    }
  }
}
