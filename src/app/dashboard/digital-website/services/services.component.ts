import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DigitalWebsiteService } from 'src/app/services/digital-website.service';
import { NgForm } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  providers: [NgbModalConfig]
})
export class ServicesComponent implements OnInit {

  services = [];
  updateServiceObj = {
    title: "",
    priorty: "",
    desc: "",
  };
  getServiceID = "";
  selectedImg=null;

  constructor(
    config: NgbModalConfig, 
    private modalService: NgbModal,
    public digitalService:DigitalWebsiteService,
    public common: CommonService,
    ) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }

  addServiceModalOpen(addService) {
    this.modalService.open(addService, { size: 'xl', centered: false });
  }


  ngOnInit(): void {
    this.digitalService.getServices().subscribe(res => {
      this.services = res;
    });
  }

  AddServiceDetails(form: NgForm) {
    let service = Object.assign({}, form.value);
    this.digitalService.addServices(service, this.selectedImg).then(res=>{
      this.common.showToast("success", "Added Successful", "Service added Successfully");
      this.dismisModal();
      this.selectedImg=null;
    })
  }

  updateServiceModalOpen(updateService, id) {
    // Display data on update form
    this.modalService.open(updateService, { size: 'xl', centered: false });
    this.digitalService.getService(id).subscribe(res => {
      this.updateServiceObj = {
        title: res['title'],
        priorty: res['priorty'],
        desc: res['desc'],
      }
    });
    this.getServiceID = id;
  }

  UpdateServiceDetails(form: NgForm) {
    let UpdateServiceData = Object.assign({}, form.value);
    this.updateServiceObj = UpdateServiceData;
    if(this.selectedImg){
      this.digitalService.updateService(this.getServiceID,UpdateServiceData,this.selectedImg)
      .then(res=>{
        this.dismisModal() 
      })
    }else{
      this.digitalService.updateService(this.getServiceID,UpdateServiceData)
      .then(res=>{
        this.dismisModal()
      })
    }
  }

  deleteService(id) {
    this.digitalService.deleteServices(id).then(res=>{
      this.common.showToast("success", "Delete Successful", "Service delete Successfully");
    }).catch(err=>{
      this.common.showToast("error", "Error Occoured", "Unable to perform this operation");
      return err;
    })
  }

  dismisModal(){
    this.modalService.dismissAll();
  }

  imageProcessing(event){
    this.selectedImg = event.target.files[0];
  }

}
