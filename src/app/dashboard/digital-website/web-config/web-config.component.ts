import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DigitalWebsiteService } from 'src/app/services/digital-website.service';

@Component({
  selector: 'app-web-config',
  templateUrl: './web-config.component.html',
  styleUrls: ['./web-config.component.scss']
})
export class WebConfigComponent implements OnInit {

  data: any
  constructor(
    private webService: DigitalWebsiteService
  ) { }

  ngOnInit(): void {
    this.webService.getWebsiteData().subscribe(res => {
      this.data = res
      console.log(this.data)
    })
  }

  getMetaTags(form: NgForm) {
    console.log(form.value)
    let data = Object.assign({}, form.value);
    console.log(data)
    let metaData = {
      title: data['title'],
      description: data['description'],
      keyWords: data['keyWords'],
      authorName: data['authorName'],
    }
    console.log("metaData",metaData)
    this.webService.updateMetaDataTags(metaData)
  }

}
