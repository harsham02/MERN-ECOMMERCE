import Stripe from "stripe";
import orderModel from "../models/orderSchema.js";
import userModel from "../models/userModel.js";
import razorpay from 'razorpay'
//globa variables
const currency = 'inr';
const deliveryCharge = 10;

//gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_51PzOTCGyVGbny1Cz05j82HAc6NjPJ33yKbJxOYsMwkbnc9RxpkjITXMij6TTFLIyjKy0nartqwMx8QrFd03wLOzB008OZMYrwl" );

const RazorpayInstance = new razorpay({
   key_id : process.env.ROZORPAY_KEY_ID || "rzp_test_WYJNhi7pqm21MU",
   key_secret : process.env.ROZORPAY_KEY_SECRET || "ZDt8UGfp8kzq8oSQ3Ojz29yu",
});

// Placing orders using COD Method
const placeOrder = async (req, res) => {
   try{
        const {userId, items, amount, address} = req.body;


        console.log(userId, items, amount);
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        };
     const newOrder = new orderModel(orderData);
     await newOrder.save();

     await userModel.findByIdAndUpdate(userId, {cartData:{}});

     res.json({success: true, message: "Order Placed"});
   }catch(error) {
      console.log(error);
      res.json({success: false, message: error.message});
   }
}

// Verify Stripe
const verifyStripe = async (req, res) => {
 const {orderId, success, userId} = req.body;

 try{
 if(success === "true") {
  await orderModel.findByIdAndUpdate(orderId, {payment: true});
  await userModel.findByIdAndUpdate(userId, {cartData: {}});
  res.json({success: true});
 }else{
    await orderModel.findByIdAndDelete(orderId);
    res.json({success:false});
 }
 }catch(error) {
  console.log(error);
  res.json({success: false, message: error.message});
 }
}

// Placing orders using Stripe Method
const placeOrderStripe = async (req, res) => {

try {
  const {userId, items, amount, address} = req.body;
  const {origin} = req.headers;
  const orderData = {
    userId,
    items,
    amount,
    address,
    paymentMethod: "Stripe",
    payment: false,
    date: Date.now()
  };
  
  const newOrder = new orderModel(orderData);
  await newOrder.save();
  
  const line_items = items.map((item) => ({
    price_data: {
      currency:currency,
      product_data: {
           name:item.name
      },
      unit_amount: item.price * 100
    },
    quantity: item.quantity
}));

line_items.push({
  price_data: {
    currency:currency,
    product_data: {
         name:"Delivery Charges"
    },
    unit_amount:deliveryCharge * 100
  },
  quantity: 1
});

const session = await stripe.checkout.sessions.create({
  success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`, 
  cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
  line_items,
  mode:'payment',
});

res.json({success: true, session_url:session.url});
} catch (error) {
  console.log(error);
  res.json({success: false, message: error.message});
}
}

// Placing orders using Razorpay Method
const placeOrderRazorpay = async (req, res) => {
     
  try {
    const {userId, items, amount, address} = req.body;
  
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now()
    };
    
    const newOrder = new orderModel(orderData);
    await newOrder.save();
    
    const options = {
      amount : amount * 100,
      currency : currency.toUpperCase(),
      receipt : newOrder._id.toString()
    }
    
    await RazorpayInstance.orders.create(options, (error, order) => {
      if(error) {
        console.log(error);
        return res.json({success: false, message: error});
      }
      res.json({success: true, order});
    });
    
  } catch (error) {
    console.log(error);
  res.json({success: false, message: error.message});
  }
}

  const verifyRazorpay = async(req, res) => {
         try {
             const {userId, razorpay_order_id} = req.body;

             const orderInfo = await RazorpayInstance.orders.fetch(razorpay_order_id);
            
             if(orderInfo.status === "paid") {
              await orderModel.findByIdAndUpdate(orderInfo.receipt, {payment: true});
              await userModel.findByIdAndUpdate(userId, {cartData: {}});

              res.json({success: true, message: "Payment Successfull"});
             }else{
              res.json({success: false, message: "Payment Failed"});
             }
         } catch (error) {
          console.log(error);
          res.json({success: false, message: error.message});
         }
  }

//All orders data from Admin Panel
const allOrders = async (req, res) => {
  
    try{
        const orders = await orderModel.find({});
        res.json({success: true, orders});
    }catch(error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
}

//User Order Data For Frontend
const userOrders = async (req, res) => {
 try{
   const {userId} = req.body;

   const orders = await orderModel.find({userId});
   res.json({success: true, orders});
 }catch(error) {
    console.log(error);
      res.json({success: false, message: error.message});
 }
}

// update Order Status
const updateStatus = async (req, res) => {
   try{
       const {orderId, status} = req.body;

       await orderModel.findByIdAndUpdate(orderId, {status});
       res.json({success: true, message: "Status Updated"});
   }catch(error) {
    console.log(error);
    res.json({success: false, message: error.message});
   }
}

export {placeOrder, placeOrderStripe, placeOrderRazorpay,allOrders, userOrders, updateStatus, verifyStripe, verifyRazorpay};