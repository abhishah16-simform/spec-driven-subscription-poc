export interface Company {
  id: string;
  name: string;
  legalName: string;
  websiteUrl?: string;
  email?: string;
  phone?: string;
  address?: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  companyId: string;
  name: string;
  email: string;
  isAdmin: boolean;
  phone?: string;
  title?: string;
  createdAt: string;
  updatedAt: string;
}

export type SubscriptionStatus = 'ACTIVE' | 'CANCELED';
export type PlanCode =
  | 'BASIC_MONTHLY'
  | 'BASIC_YEARLY'
  | 'STANDARD_MONTHLY'
  | 'STANDARD_YEARLY';

export interface Subscription {
  id: string;
  companyId: string;
  planCode: PlanCode;
  planName: string;
  price: number;
  status: SubscriptionStatus;
  startedAt: string;
  canceledAt: string | null;
  createdByUserId: string;
  canceledByUserId: string | null;
  createdAt: string;
  updatedAt: string;
}
