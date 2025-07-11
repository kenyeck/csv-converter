/* eslint-disable turbo/no-undeclared-env-vars */
import { getUserCollection } from '@lib/mongodb';
import { Request, Response } from 'express';
import { Stripe } from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
   apiVersion: '2025-06-30.basil',
   typescript: true
});

export const getPlans = async (req: Request, res: Response) => {
   const prices = await stripe.prices.list({ active: true }); // expand: ['data.product'] });
   res.json(prices.data.filter((price) => price.recurring));
};

export const createCheckoutSession = async (req: Request, res: Response) => {
   try {
      const { email, priceId } = req.body;

      if (!email || !priceId) {
         return res.status(400).json({ error: 'Missing user/price info' });
      }

      const session = await stripe.checkout.sessions.create({
         payment_method_types: ['card'],
         mode: 'subscription',
         customer_email: email,
         line_items: [
            {
               price: priceId,
               quantity: 1
            }
         ],
         success_url: `${process.env.STRIPE_CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
         cancel_url: `${process.env.STRIPE_CLIENT_URL}`,
         metadata: { email }
         // subscription_data: {
         //    billing_cycle_anchor: Date.now()
         // }
      });

      res.json({ url: session.url });
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
   }
};

export const createPortalSession = async (req: Request, res: Response) => {
   // For demonstration purposes, we're using the Checkout session to retrieve the customer ID.
   // Typically this is stored alongside the authenticated user in your database.
   const { session_id } = req.body;
   const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

   // This is the url to which the customer will be redirected when they're done
   // managing their billing with the portal.
   const returnUrl = process.env.STRIPE_CLIENT_URL || 'http://localhost:3000';

   const portalSession = await stripe.billingPortal.sessions.create({
      customer: checkoutSession.customer as string,
      return_url: returnUrl
   });

   res.redirect(303, portalSession.url);
};

export const handleStripeWebhook = async (req: Request, res: Response) => {
   const sig = req.headers['stripe-signature'] as string;

   let event: Stripe.Event;
   try {
      event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
   } catch (err) {
      console.error(`Webhook Error: ${(err as Error).message}`);
      return res.status(400).send(`Webhook Error: ${(err as Error).message}`);
   }

   //console.log('Received Stripe event:', event.type);

   const users = await getUserCollection();

   if (event.type === 'checkout.session.completed') {
      const subscription = event.data.object as unknown as Stripe.Subscription;
      const email = subscription.metadata?.email ?? 'ken.yeck@gmail.com';

      if (email) {
         await users.findOneAndUpdate(
            { email: email },
            { $set: { subscriptionStatus: 'active', stripeSubscriptionId: subscription.id } },
            { upsert: false }
         );
      }
   }

   if (event.type === 'customer.subscription.deleted') {
      const subscription = event.data.object as Stripe.Subscription;

      const user = await users.findOne({ stripeSubscriptionId: subscription.id });
      if (user) {
         await users.findOneAndUpdate(
            { _id: user._id },
            { $set: { subscriptionStatus: 'canceled', stripeSubscriptionId: null } },
            { upsert: false }
         );
      }
   }

   res.json({ received: true });
};
