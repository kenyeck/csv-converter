export interface BillingOption {
   type: 'monthly' | 'annual' | string;
   price: { $numberDecimal: string }; // Adjusted to handle MongoDB Decimal128
   currency: string;
   billingCycle: 'month' | 'year' | string;
}

export interface Plan {
   name: string;
   description: string;
   features: string[];
   price: string;
   tag: string;
   buttonText: string;
   primary?: boolean;
   order: string;
   stripePriceId?: string; // Stripe Price ID
}
