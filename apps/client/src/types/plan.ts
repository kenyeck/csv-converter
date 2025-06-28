export interface BillingOption {
  type: 'monthly' | 'annual' | string;
  price: number;
  currency: string;
  billing_cycle: 'month' | 'year' | string;
}

export interface Plan {
  _id: { $oid: string };
  name: string;
  description: string;
  features: string[];
  billing_options: BillingOption[];
  active: boolean;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
}