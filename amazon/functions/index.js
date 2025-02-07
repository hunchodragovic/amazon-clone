const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51QpDOyFMc8eH6oS7txJXQEgc2xSqsuMAPAukSePOgsPlVvFs1OmH2OVTQ8tpY9xNrcuKH5hBt3XeuicbSPB5zaFJ00Td4BWPKS"
);
// App config
const app = express();
// middlewares
console.log();

app.use(cors({ origin: true }));
app.use(express.json());

// API Routes
app.get("/", (req, res) => res.status(200).send("Hello World"));
app.post("/payments/create", async (req, res) => {
  const total = req.query.total;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });
  // Ok - created
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});
// example endpoint
// http://127.0.0.1:5001/clone-9b843/us-central1/api

// Listen command
exports.api = functions.https.onRequest(app);
