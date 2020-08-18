import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp()
const db = admin.firestore();
const mkdirp = require('mkdirp-promise');
const spawn = require('child-process-promise').spawn;
const path = require('path');
const os = require('os');
const fs = require('fs');
let MOB_MAX_HEIGHT = 500;
let MOB_MAX_WIDTH = 500;
// Thumbnail prefix added to file names.
const MOB_PREFIX = 'mob';
exports.generateLowResImages = functions.storage.object().onFinalize(async (object:any) => {
const filePath = object.name;
const contentType = object.contentType; // This is the image MIME type
const fileDir = path.dirname(filePath);
const fileName = path.basename(filePath);
const mobileFilePath = path.normalize(path.join(fileDir, `${MOB_PREFIX}`));
const tempLocalFile = path.join(os.tmpdir(), filePath);
const tempLocalDir = path.dirname(tempLocalFile);
const tempLocalMobileFile = path.join(os.tmpdir(), mobileFilePath);
let imageId=null

if (!contentType.startsWith('image/')) {
   //console.log('This is not an image.');
   return
}
if (fileName.startsWith(MOB_PREFIX)) {
   //console.log('Already a Mobile.');
   return
}
const filePathParts =  filePath.split("/");
const userId = filePathParts[0];
const  collection = filePathParts[1];
  if(collection == 'carousel'){
        MOB_MAX_HEIGHT = 1200;
        MOB_MAX_WIDTH = 500;
  }
  if(filePathParts[3]){
     imageId=filePathParts[3]
     console.log(imageId)
  }
 // console.log('collectionName', collectionName);
//  console.log('documentId', documentId);
if(userId && collection){
    const bucket = admin.storage().bucket(object.bucket);
    const file = bucket.file(filePath);
    const mobileFile = bucket.file(mobileFilePath);
    const metadata = {
      contentType: contentType,
      // To enable Client-side caching you can set the Cache-Control headers here. Uncomment below.
       'Cache-Control': 'public,max-age=3600',
    };
    await mkdirp(tempLocalDir);
    // Download file from bucket.
    await file.download({destination: tempLocalFile});
    // Generate a thumbnail using ImageMagick.
    await spawn('convert', [tempLocalFile, '-thumbnail', `${MOB_MAX_WIDTH}x${MOB_MAX_HEIGHT}>`, tempLocalMobileFile], {capture: ['stdout', 'stderr']});
    // Uploading the Thumbnail.
    await bucket.upload(tempLocalMobileFile, {destination: mobileFilePath, metadata: metadata});
    // Once the image has been uploaded delete the local files to free up disk space.
    fs.unlinkSync(tempLocalFile);
    fs.unlinkSync(tempLocalMobileFile);
    // code to get url for each image 
    const config:any = {
     action: 'read',
     expires: '03-01-2500',
   };
     const results = await Promise.all([
     mobileFile.getSignedUrl(config),
     file.getSignedUrl(config)
]);

    const mobileResult = results[0];
    const mobileUrl = mobileResult[0];

  if(imageId){
     console.log(imageId)
     await db.collection("users").doc(userId).collection(collection).doc(imageId).update({
           imgUrl:mobileUrl
     })
   }
}
});


