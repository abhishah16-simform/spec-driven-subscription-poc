import { PlanCode } from '../common/in-memory/domain.types';

export interface PlanCatalogEntry {
  code: PlanCode;
  displayName: string;
  billingCycle: 'MONTHLY' | 'YEARLY';
  price: number;
}

export const PLAN_CATALOG: PlanCatalogEntry[] = [
  {
    code: 'BASIC_MONTHLY',
    displayName: 'Basic Monthly',
    billingCycle: 'MONTHLY',
    price: 250,
  },
  {
    code: 'BASIC_YEARLY',
    displayName: 'Basic Yearly',
    billingCycle: 'YEARLY',
    price: 2500,
  },
  {
    code: 'STANDARD_MONTHLY',
    displayName: 'Standard Monthly',
    billingCycle: 'MONTHLY',
    price: 750,
  },
  {
    code: 'STANDARD_YEARLY',
    displayName: 'Standard Yearly',
    billingCycle: 'YEARLY',
    price: 7500,
  },
];

export function getPlanByCode(code: string): PlanCatalogEntry | undefined {
  return PLAN_CATALOG.find((p) => p.code === code);
}
