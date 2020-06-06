import * as functions from 'firebase-functions';
import * as Razorpay from 'razorpay';
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

 export const createOrder = functions.https.onRequest((request, response) => {
    response.set('Access-Control-Allow-Origin', "*")
    response.set('Access-Control-Allow-Methods', 'GET, POST')
    const instance = new Razorpay({
        key_id: 'rzp_test_IpmvnhJLosPYGm',
        key_secret: '2W4vqlrHPuMGopMJ9ID2mwAB'
      })
    const options = {
        amount: request.body.amount,  // amount in the smallest currency unit
        currency: "INR",
        receipt: "order_rcptid_15",
        payment_capture: true
      };
      instance.orders.create(options).then((res:any)=>{
        response.send(res);
      }).catch((err:any)=>{
        console.log(err)
        response.send(err);
      })
 });

