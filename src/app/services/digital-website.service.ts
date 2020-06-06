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
    return this.db.collection("users").doc(this.auth.getUid()).update({ socialMedia: socialLinks }).then(res => {
      this.common.showToast("success", "Update Successful", "Your social media links Updated Successfully")
      return res;
    }).catch(err => {
      this.common.showToast("error", "Error Occoured", "Unable to perform this operation")
      return err;
    })
  }

  // Contact information
  updateContactInfo(address, personalData) {
    return this.db.collection("users").doc(this.auth.getUid()).update({ address: address, ...personalData }).then(res => {
      this.common.showToast("success", "Update Successful", "Contact Details Updated Successfully")
      return res;
    }).catch(err => {
      this.common.showToast("error", "Error Occoured", "Unable to perform this operation")
      return err;
    })
  }

  aboutUs(aboutUsContent) {
    return this.db.collection("users").doc(this.auth.getUid()).update({ aboutUs: aboutUsContent }).then(res => {
      this.common.showToast("success", "Update Successful", "About Us Updated Successfully")
      return res;
    }).catch(err => {
      this.common.showToast("error", "Error Occoured", "Unable to perform this operation")
      return err;
    })
  }

  addProduct(product, prodImg?) {
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
    })
  }

  updateProduct(id, proData, img?) {
    let path = this.auth.getUid() + "/" + "products/" + id + "/image";
    if (img) {
      return this.storage.upload(path, img).then(newUrl => {
        console.log("newUrl")
         return this.updateProduct(id, { imgUrl: newUrl, ...proData });
      }).catch(err=>{
        console.log(err)
      })
    } else {
      return this.db.collection("users").doc(this.auth.getUid()).collection("products").doc(id).update(proData).then(res => {
        this.common.showToast("success", "Update Successful", "Product Updated Successfully")
        return res
      }).catch(err => {
        return err;
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
    let path = this.auth.getUid() + "/" + "services/" + id + "/image";
    if (img) {
      return this.storage.upload(path, img).then(newUrl => {
         return this.updateService(id, { imgUrl: newUrl, ...serviceData });
      }).catch(err=>{
        console.log(err)
      })
    } else {
      return this.db.collection("users").doc(this.auth.getUid()).collection("services").doc(id).update(serviceData).then(res => {
        this.common.showToast("success", "Update Successful", "Service Updated Successfully")
        return res
      }).catch(err => {
        return err;
      })
    }
  }

  deleteServices(id) {
    let path = this.auth.getUid() + "/" + "services/" + id + "/image";
    return this.db.collection("users").doc(this.auth.getUid()).collection("services").doc(id).delete().then(res => {
      this.storage.deleteImage(path);
      return res
    }).catch(err => {
      console.log(err)
    })
  }

  uploadGalleryImg(imgArr){
    let path = this.auth.getUid() + "/gallery" + "/image/";


    console.log(path+imgArr[0]['fileName'])
    let img={
      id:this.auth.getUid(),
      filename:"pradeep"
    }

    // this.db.collection("users").doc(this.auth.getUid()).collection("gallery").add(img)
    console.log("done")


  }


}