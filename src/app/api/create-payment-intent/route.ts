const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(req : Request) {
  try {
    const { amount } = await req.json();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "inr",
      automatic_payment_methods: { enabled: true },
    });

    return Response.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Internal Error:", error);
    return Response.json({
        error: `Internal Server Error: ${error}`
    },{status : 500})
  }
}