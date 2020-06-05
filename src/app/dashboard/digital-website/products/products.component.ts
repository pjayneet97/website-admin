import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DigitalWebsiteService } from 'src/app/services/digital-website.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  // add NgbModalConfig and NgbModal to the component providers
  providers: [NgbModalConfig, NgbModal]
})
export class ProductsComponent implements OnInit {
  products=[]
  constructor(config: NgbModalConfig, private modalService: NgbModal,public digiService:DigitalWebsiteService) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  open(content) {
    this.modalService.open(content, { size: 'xl', centered: false });
  }

  ngOnInit(): void {
    let product = {name:"name"}
    this.digiService.addProduct(product).then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
    this.digiService.getProducts().subscribe(res=>{
      console.log(res)
      this.products=res
    })
  }

}
