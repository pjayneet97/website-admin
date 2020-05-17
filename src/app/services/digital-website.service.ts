import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { AuthService } from 'src/app/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DigitalWebsiteService {

  constructor(
    public afAuth: AngularFireAuth, 
    public db: AngularFirestore,
    public common: CommonService,
    public auth:AuthService
  ) { }

  public myEventList: any;

  getWebsiteData(){
    return this.db.collection("users").doc(this.auth.getUid()).valueChanges()
  }

  updateSocialMediaLinks(socialLinks){
    return this.db.collection("users").doc(this.auth.getUid()).update({socialMedia:socialLinks}).then(res => {
      this.common.showToast("success", "Update Successful", "Your social media links Updated Successfully")
      return res;
    }).catch(err => {
      this.common.showToast("error", "Error Occoured", "Unable to perform this operation")
      return err;
    })
  }

  // Contact information

  updateContactInfo(address,personalData){
    return this.db.collection("users").doc(this.auth.getUid()).update({address:address,...personalData}).then(res => {
      this.common.showToast("success", "Update Successful", "Contact Details Updated Successfully")
      return res;
    }).catch(err => {
      this.common.showToast("error", "Error Occoured", "Unable to perform this operation")
      return err;
    })
  }




}
