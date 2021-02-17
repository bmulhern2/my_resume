import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  videos: any
  constructor(private http: HttpClient, private el: ElementRef) {}
  ngOnInit() {
    this.http.get('/video').subscribe(videos => {
      if (videos) {
        this.videos = videos
        console.log(this.videos)
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
