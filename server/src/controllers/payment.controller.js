const Razorpay = require("razorpay");
const { User } = require("../models/user/User");

const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = process.env;

const razorpayInstance = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
});

const createOrder = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId, { password: 0, __v: 0 });

    const amount = req.body.total;
    const options = {
      amount: amount,
      currency: "INR",
      receipt: "razorUser@gmail.com",
    };

    razorpayInstance.orders.create(options, (err, order) => {
      if (!err) {
        res.status(200).send({
          success: true,
          msg: "Order Created",
          order_id: order.id,
          amount: amount,
          key_id: RAZORPAY_KEY_ID,
          product_name: req.body.name,
          description: req.body.description,
          name: user.name,
          email: user.email,
        });
      } else {
        console.log(err);
        res.status(400).send({ success: false, msg: "Something went wrong!" });
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  createOrder,
};
