import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { AuthService } from 'src/app/services/auth.service';
import { map } from 'rxjs/operators';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class DigitalWebsiteService {

  constructor(
    public afAuth: AngularFireAuth,
    public db: AngularFirestore,
    public common: CommonService,
    public auth: AuthService,
    public storage: StorageService
  ) { }

  public myEventList: any;

  getWebsiteData() {
    return this.db.collection("users").doc(this.auth.getUid()).valueChanges()
  }

  updateSocialMediaLinks(socialLinks) {
    this.common.showLoader()
    return this.db.collection("users").doc(this.auth.getUid()).update({ socialMedia: socialLinks }).then(res => {
      this.common.showToast("success", "Update Successful", "Your social media links Updated Successfully")
      return res;
    }).catch(err => {
      this.common.showToast("error", "Error Occoured", "Unable to perform this operation")
      return err;
    }).finally(()=>{
      this.common.stopLoader()
    })
  }

  // Contact information
  updateContactInfo(address, personalData) {
    this.common.showLoader()
    return this.db.collection("users").doc(this.auth.getUid()).update({ address: address, ...personalData }).then(res => {
      this.common.showToast("success", "Update Successful", "Contact Details Updated Successfully")
      return res;
    }).catch(err => {
      this.common.showToast("error", "Error Occoured", "Unable to perform this operation")
      return err;
    }).finally(()=>{
      this.common.stopLoader()
    })
  }

  aboutUs(aboutUsContent) {
    this.common.showLoader()
    return this.db.collection("users").doc(this.auth.getUid()).update({ aboutUs: aboutUsContent }).then(res => {
      this.common.showToast("success", "Update Successful", "About Us Updated Successfully")
      return res;
    }).catch(err => {
      this.common.showToast("error", "Error Occoured", "Unable to perform this operation")
      return err;
    }).finally(()=>{
      this.common.stopLoader()
    })
  }

  addProduct(product, prodImg?) {
    this.common.showLoader()
    return this.db.collection("users").doc(this.auth.getUid()).collection("products").add(product).then(res => {
      let path = this.auth.getUid() + "/" + "products/" + res.id + "/image"
      this.storage.upload(path, prodImg).then(imgUrl => {
        this.updateProduct(res.id, { imgUrl: imgUrl })
      }).catch(err => {
        console.log(err)
      })
      return res;
    }).catch(err => {
      this.common.showToast("error", "Error Occoured", "Unable to perform this operation")
      return err;
    }).finally(()=>{
      this.common.stopLoader()
    })
  }

  updateProduct(id, proData, img?) {
    this.common.showLoader()
    let path = this.auth.getUid() + "/" + "products/" + id + "/image";
    if (img) {
      return this.storage.upload(path, img).then(newUrl => {
        console.log("newUrl")
         return this.updateProduct(id, { imgUrl: newUrl, ...proData });
      }).catch(err=>{
        console.log(err)
      }).finally(()=>{
        this.common.stopLoader()
      })
    } else {
      return this.db.collection("users").doc(this.auth.getUid()).collection("products").doc(id).update(proData).then(res => {
        this.common.showToast("success", "Update Successful", "Product Updated Successfully")
        return res
      }).catch(err => {
        return err;
      }).finally(()=>{
        this.common.stopLoader()
      })
    }
  }

  getProducts() {
    return this.db.collection("users").doc(this.auth.getUid()).collection("products").snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getProduct(id) {
    return this.db.collection("users").doc(this.auth.getUid()).collection("products").doc(id).valueChanges()
  }

  deleteProduct(id) {
    return this.db.collection("users").doc(this.auth.getUid()).collection("products").doc(id).delete()
  }



  addServices(serviceData, serviceImg) {
    this.common.showLoader()
    return this.db.collection("users").doc(this.auth.getUid()).collection("services").add(serviceData).then(res => {
      let path = this.auth.getUid() + "/" + "services/" + res.id + "/image"
      this.storage.upload(path, serviceImg).then(imgUrl => {
        this.updateService(res.id, { imgUrl: imgUrl })
      }).catch(err => {
        console.log(err)
      })
      return res;
    }).catch(err => {
      this.common.showToast("error", "Error Occoured", "Unable to perform this operation")
      return err;
    }).finally(()=>{
      this.common.stopLoader()
    })
  }

  getServices() {
    return this.db.collection("users").doc(this.auth.getUid()).collection("services").snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getService(id) {
    return this.db.collection("users").doc(this.auth.getUid()).collection("services").doc(id).valueChanges()
  }

  updateService(id, serviceData, img?) {
    this.common.showLoader()
    let path = this.auth.getUid() + "/" + "services/" + id + "/image";
    if (img) {
      return this.storage.upload(path, img).then(newUrl => {
         return this.updateService(id, { imgUrl: newUrl, ...serviceData });
      }).catch(err=>{
        console.log(err)
      }).finally(()=>{
        this.common.stopLoader()
      })
    } else {
      return this.db.collection("users").doc(this.auth.getUid()).collection("services").doc(id).update(serviceData).then(res => {
        this.common.showToast("success", "Update Successful", "Service Updated Successfully")
        return res
      }).catch(err => {
        return err;
      }).finally(()=>{
        this.common.stopLoader()
      })
    }
  }

  deleteServices(id) {
    this.common.showLoader()
    let path = this.auth.getUid() + "/" + "services/" + id + "/image";
    return this.db.collection("users").doc(this.auth.getUid()).collection("services").doc(id).delete().then(res => {
      this.storage.deleteImage(path);
      return res
    }).catch(err => {
      console.log(err)
    }).finally(()=>{
      this.common.stopLoader()
    })
  }

  uploadGalleryImg(file){
    this.common.showLoader()
    this.db.collection("users").doc(this.auth.getUid()).collection("gallery").add({}).then(res=>{
      let path = this.auth.getUid() + "/gallery/" + res.id + "/image"
      return this.storage.upload(path,file).then(url=>{
        return this.db.collection("users").doc(this.auth.getUid()).collection("gallery").doc(res.id).set({imgUrl:url})
      }).catch(err=>{
        console.log(err)
      })
    }).catch(err=>{
      console.log(err)
    }).finally(()=>{
      this.common.stopLoader()
    })
  }

  getGallery(){
    return this.db.collection("users").doc(this.auth.getUid()).collection("gallery").snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )
  }

  delGalleryImage(id){
    this.common.showLoader()
    let path = this.auth.getUid() + "/gallery/" + id + "/image"
    this.storage.deleteImage(path)
    this.db.collection("users").doc(this.auth.getUid()).collection("gallery").doc(id).delete().finally(()=>{
      this.common.stopLoader()
    })

  }

  paymentMethods(paymentIds,bankDetails) {
    this.common.showLoader()
    return this.db.collection("users").doc(this.auth.getUid()).update({ paymentsId: paymentIds, ...bankDetails }).then(res => {
      this.common.showToast("success", "Update Successful", "Payments Updated Successfully")
      return res;
    }).catch(err => {
      this.common.showToast("error", "Error Occoured", "Unable to perform this operation")
      return err;
    }).finally(()=>{
      this.common.stopLoader()
    })
  }


} 