export interface BillingOption {
   type: 'monthly' | 'annual' | string;
   price: { $numberDecimal: string }; // Adjusted to handle MongoDB Decimal128
   currency: string;
   billingCycle: 'month' | 'year' | string;
}

export interface Plan {
   _id: { $oid: string };
   name: string;
   description: string;
   features: string[];
   tag: string;
   buttonText: string;
   primary: boolean;
   stripePriceId?: string;
   price: string;
   order: number;
}
