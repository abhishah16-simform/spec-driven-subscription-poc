import { Company, User, Subscription } from './domain.types';

// Fixed seed IDs so the data is stable across restarts
const C1_ID = 'c1000000-0000-0000-0000-000000000001';
const C2_ID = 'c2000000-0000-0000-0000-000000000002';

const U1_ID = 'u1000000-0000-0000-0000-000000000001';
const U2_ID = 'u2000000-0000-0000-0000-000000000002';
const U3_ID = 'u3000000-0000-0000-0000-000000000003';
const U4_ID = 'u4000000-0000-0000-0000-000000000004';

const S1_ID = 's1000000-0000-0000-0000-000000000001';
const S2_ID = 's2000000-0000-0000-0000-000000000002';

export interface SeedData {
  companies: Company[];
  users: User[];
  subscriptions: Subscription[];
}

export function buildSeedData(): SeedData {
  const now = new Date().toISOString();
  const past = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

  const companies: Company[] = [
    {
      id: C1_ID,
      name: 'Acme Corp',
      legalName: 'Acme Corporation Ltd',
      websiteUrl: 'https://acme.example.com',
      email: 'contact@acme.example.com',
      phone: '+1-555-100-0001',
      address: '1 Acme Ave, Springfield',
      createdAt: past,
      updatedAt: past,
    },
    {
      id: C2_ID,
      name: 'Globex Inc',
      legalName: 'Globex Incorporated',
      websiteUrl: 'https://globex.example.com',
      email: 'info@globex.example.com',
      phone: '+1-555-200-0002',
      address: '2 Globex Blvd, Shelbyville',
      createdAt: past,
      updatedAt: past,
    },
  ];

  const users: User[] = [
    {
      id: U1_ID,
      companyId: C1_ID,
      name: 'Alice Admin',
      email: 'alice@acme.example.com',
      isAdmin: true,
      title: 'CEO',
      phone: '+1-555-101-0001',
      createdAt: past,
      updatedAt: past,
    },
    {
      id: U2_ID,
      companyId: C1_ID,
      name: 'Bob User',
      email: 'bob@acme.example.com',
      isAdmin: false,
      title: 'Developer',
      phone: '+1-555-101-0002',
      createdAt: past,
      updatedAt: past,
    },
    {
      id: U3_ID,
      companyId: C2_ID,
      name: 'Carol Admin',
      email: 'carol@globex.example.com',
      isAdmin: true,
      title: 'CTO',
      phone: '+1-555-201-0001',
      createdAt: past,
      updatedAt: past,
    },
    {
      id: U4_ID,
      companyId: C2_ID,
      name: 'Dave User',
      email: 'dave@globex.example.com',
      isAdmin: false,
      title: 'Designer',
      phone: '+1-555-201-0002',
      createdAt: past,
      updatedAt: past,
    },
  ];

  const subscriptions: Subscription[] = [
    {
      id: S1_ID,
      companyId: C1_ID,
      planCode: 'STANDARD_MONTHLY',
      planName: 'Standard Monthly',
      price: 750,
      status: 'ACTIVE',
      startedAt: past,
      canceledAt: null,
      createdByUserId: U1_ID,
      canceledByUserId: null,
      createdAt: past,
      updatedAt: past,
    },
    {
      id: S2_ID,
      companyId: C2_ID,
      planCode: 'BASIC_YEARLY',
      planName: 'Basic Yearly',
      price: 2500,
      status: 'CANCELED',
      startedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      canceledAt: past,
      createdByUserId: U3_ID,
      canceledByUserId: U3_ID,
      createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: past,
    },
  ];

  // suppress unused warning — `now` used below for documentation purposes
  void now;

  return { companies, users, subscriptions };
}
