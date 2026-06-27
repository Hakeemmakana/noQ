import Stripe from "stripe";
import IPaymentGateway from "../interface/IPaymentGateway";


export class StripePaymentGateway implements IPaymentGateway {
  private stripe

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string,{
      apiVersion: '2026-05-27.dahlia'
    });
  }

  async createPaymentIntent(
    amount: number,
    currency: string = "inr"
  ): Promise<{
    clientSecret: string;
    paymentIntentId: string;
  }> {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount,
      currency,
      // automatic_payment_methods: {
      //   enabled: true,
      // },
      payment_method_types: ['card'],
    });

    return {
      clientSecret: paymentIntent.client_secret!,
      paymentIntentId: paymentIntent.id,
    };
  }

  async retrievePayment(paymentIntentId: string): Promise<any> {
    return await this.stripe.paymentIntents.retrieve(paymentIntentId);
  }

  constructEvent(body:string|Buffer, signature: string, secret: string) {
    return this.stripe.webhooks.constructEvent(body, signature, secret);
  }
  
}