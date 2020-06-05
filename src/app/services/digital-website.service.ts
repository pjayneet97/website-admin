import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { AuthService } from 'src/app/services/auth.service';
import { map } from 'rxjs/operators';

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

  aboutUs(aboutUsContent){
    return this.db.collection("users").doc(this.auth.getUid()).update({aboutUs:aboutUsContent}).then(res => {
      this.common.showToast("success", "Update Successful", "About Us Updated Successfully")
      return res;
    }).catch(err => {
      this.common.showToast("error", "Error Occoured", "Unable to perform this operation")
      return err;
    })
  }

  addProduct(product){
    return this.db.collection("users").doc(this.auth.getUid()).collection("products").add(product).then(res => {
      this.common.showToast("success", "Update Successful", "About Us Updated Successfully")
      return res;
    }).catch(err => {
      this.common.showToast("error", "Error Occoured", "Unable to perform this operation")
      return err;
    })
  }

  getProducts(){
    return this.db.collection("users").doc(this.auth.getUid()).collection("products").snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  deleteProduct(id){
    return this.db.collection("users").doc(this.auth.getUid()).collection("products").doc(id).delete()
  }


}