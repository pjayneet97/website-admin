import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  constructor() { }

  themeTemplates = [
    {
      id:1,
      title:"Best HTML and CSS template",
      thumbnailImgUrl:"https://themes.getbootstrap.com/wp-content/uploads/2019/04/landkit-screenshot-540x405.png"
    },
    {
      id:2,
      title:"Best HTML and CSS template",
      thumbnailImgUrl:"https://themes.getbootstrap.com/wp-content/uploads/2019/10/screenshot-1-540x405.jpg"
    },
    {
      id:3,
      title:"Best HTML and CSS template",
      thumbnailImgUrl:"https://themes.getbootstrap.com/wp-content/uploads/2019/03/leap-1-540x405.png"
    },
    {
      id:4,
      title:"Best HTML and CSS template",
      thumbnailImgUrl:"https://themes.getbootstrap.com/wp-content/uploads/2018/04/screenshot-2-540x405.png"
    },   
    {
      id:1,
      title:"Best HTML and CSS template",
      thumbnailImgUrl:"https://themes.getbootstrap.com/wp-content/uploads/2019/04/landkit-screenshot-540x405.png"
    },
    {
      id:2,
      title:"Best HTML and CSS template",
      thumbnailImgUrl:"https://themes.getbootstrap.com/wp-content/uploads/2019/10/screenshot-1-540x405.jpg"
    },
    {
      id:3,
      title:"Best HTML and CSS template",
      thumbnailImgUrl:"https://themes.getbootstrap.com/wp-content/uploads/2019/03/leap-1-540x405.png"
    },
    {
      id:4,
      title:"Best HTML and CSS template",
      thumbnailImgUrl:"https://themes.getbootstrap.com/wp-content/uploads/2018/04/screenshot-2-540x405.png"
    },   
    
  ]

  ngOnInit(): void {
    
  }


}
