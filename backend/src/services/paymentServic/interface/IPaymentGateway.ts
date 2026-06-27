
export default interface IPaymentGateway {
  createPaymentIntent(amount: number,currency?: string):
  Promise<{clientSecret: string;paymentIntentId: string;}>;
  retrievePayment(paymentIntentId: string): Promise<any>;
  constructEvent(body: any, signature: string, secret: string):any;
}