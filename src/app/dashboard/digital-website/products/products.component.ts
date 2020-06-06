import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DigitalWebsiteService } from 'src/app/services/digital-website.service';
import { NgForm } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  // add NgbModalConfig and NgbModal to the component providers
  providers: [NgbModalConfig]
})
export class ProductsComponent implements OnInit {

  products=[];
  getProdID = ''
  updateProducts={
    itemCategory: "",
    itemDescription: "",
    itemName: "",
    itemPrice: "",
    priorty: ""
  };
  selectedImg=null;

  constructor(
    config: NgbModalConfig, 
    private modalService: NgbModal,
    public digiService:DigitalWebsiteService,
    public common: CommonService,
    ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }
  
  addProductModalOpen(addproduct) {
    this.modalService.open(addproduct, { size: 'xl', centered: false });
  }
  updateProductModalOpen(updateProduct,id) {
    // Display data on update form
    this.modalService.open(updateProduct, { size: 'xl', centered: false });
    this.digiService.getProduct(id).subscribe(res=>{
      this.updateProducts = {
        itemCategory: res['itemCategory'],
        itemDescription: res['itemDescription'],
        itemName: res['itemName'],
        itemPrice: res['itemPrice'],
        priorty: res['priorty']
      }
    });
    this.getProdID = id;
  }

  ngOnInit(): void {
    this.digiService.getProducts().subscribe(res=>{
      this.products=res;
    });
  }

  priceOnly(event):boolean{
    const charCode = (event.which) ? event.which : event.keyCode;
    if ((charCode < 46 || charCode > 57)) {
      return false;
    }
    return true;
  }


  AddproductDetails(form:NgForm){
    let product = Object.assign({}, form.value);
    this.digiService.addProduct(product, this.selectedImg).then(res=>{
      this.common.showToast("success", "Added Successful", "Service added Successfully");
      this.dismisModal();
      this.selectedImg=null;
      console.log(res);
    }).catch(err=>{
      console.log(err);
    })
  }

  UpdateProductDetails(form:NgForm){
    let UpdateProduct = Object.assign({}, form.value);
    this.updateProducts = UpdateProduct;
    if(this.selectedImg){
      this.digiService.updateProduct(this.getProdID,UpdateProduct,this.selectedImg)
      .then(res=>{
        this.dismisModal() 
      })
    }else{
      this.digiService.updateProduct(this.getProdID,UpdateProduct)
      .then(res=>{
        this.dismisModal()
      })
    }
  }

  deleteProduct(id){
    this.digiService.deleteProduct(id);
  }

  dismisModal(){
    this.modalService.dismissAll();
  }

  imageProcessing(event){
    this.selectedImg = event.target.files[0];
  }


}
