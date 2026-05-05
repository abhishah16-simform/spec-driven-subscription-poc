import { Company, User, Subscription } from './domain.types';

// Fixed seed IDs so the data is stable across restarts
const C1_ID = 'c1000000-0000-0000-0000-000000000001';
const C2_ID = 'c2000000-0000-0000-0000-000000000002';
const C3_ID = 'c3000000-0000-0000-0000-000000000003';
const C4_ID = 'c4000000-0000-0000-0000-000000000004';
const C5_ID = 'c5000000-0000-0000-0000-000000000005';
const C6_ID = 'c6000000-0000-0000-0000-000000000006';
const C7_ID = 'c7000000-0000-0000-0000-000000000007';
const C8_ID = 'c8000000-0000-0000-0000-000000000008';
const C9_ID = 'c9000000-0000-0000-0000-000000000009';
const C10_ID = 'c10000000-0000-0000-0000-000000000010';
const C11_ID = 'c11000000-0000-0000-0000-000000000011';
const C12_ID = 'c12000000-0000-0000-0000-000000000012';

const U1_ID = 'u1000000-0000-0000-0000-000000000001';
const U2_ID = 'u2000000-0000-0000-0000-000000000002';
const U3_ID = 'u3000000-0000-0000-0000-000000000003';
const U4_ID = 'u4000000-0000-0000-0000-000000000004';
const U5_ID = 'u5000000-0000-0000-0000-000000000005';
const U6_ID = 'u6000000-0000-0000-0000-000000000006';
const U7_ID = 'u7000000-0000-0000-0000-000000000007';
const U8_ID = 'u8000000-0000-0000-0000-000000000008';
const U9_ID = 'u9000000-0000-0000-0000-000000000009';
const U10_ID = 'u10000000-0000-0000-0000-000000000010';
const U11_ID = 'u11000000-0000-0000-0000-000000000011';
const U12_ID = 'u12000000-0000-0000-0000-000000000012';
const U13_ID = 'u13000000-0000-0000-0000-000000000013';
const U14_ID = 'u14000000-0000-0000-0000-000000000014';
const U15_ID = 'u15000000-0000-0000-0000-000000000015';
const U16_ID = 'u16000000-0000-0000-0000-000000000016';
const U17_ID = 'u17000000-0000-0000-0000-000000000017';
const U18_ID = 'u18000000-0000-0000-0000-000000000018';
const U19_ID = 'u19000000-0000-0000-0000-000000000019';
const U20_ID = 'u20000000-0000-0000-0000-000000000020';
const U21_ID = 'u21000000-0000-0000-0000-000000000021';
const U22_ID = 'u22000000-0000-0000-0000-000000000022';
const U23_ID = 'u23000000-0000-0000-0000-000000000023';
const U24_ID = 'u24000000-0000-0000-0000-000000000024';

const S1_ID = 's1000000-0000-0000-0000-000000000001';
const S2_ID = 's2000000-0000-0000-0000-000000000002';
const S3_ID = 's3000000-0000-0000-0000-000000000003';
const S4_ID = 's4000000-0000-0000-0000-000000000004';
const S5_ID = 's5000000-0000-0000-0000-000000000005';
const S6_ID = 's6000000-0000-0000-0000-000000000006';
const S7_ID = 's7000000-0000-0000-0000-000000000007';
const S8_ID = 's8000000-0000-0000-0000-000000000008';

export interface SeedData {
  companies: Company[];
  users: User[];
  subscriptions: Subscription[];
}

export function buildSeedData(): SeedData {
  const past = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
  const older = new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString();

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
    {
      id: C3_ID,
      name: 'Initech',
      legalName: 'Initech Solutions LLC',
      websiteUrl: 'https://initech.example.com',
      email: 'hello@initech.example.com',
      phone: '+1-555-300-0003',
      address: '3 Tech Park, Austin',
      createdAt: past,
      updatedAt: past,
    },
    {
      id: C4_ID,
      name: 'Umbrella Corp',
      legalName: 'Umbrella Corporation',
      websiteUrl: 'https://umbrella.example.com',
      email: 'ops@umbrella.example.com',
      phone: '+1-555-400-0004',
      address: '4 Research Dr, Raccoon City',
      createdAt: past,
      updatedAt: past,
    },
    {
      id: C5_ID,
      name: 'Stark Industries',
      legalName: 'Stark Industries Inc',
      websiteUrl: 'https://stark.example.com',
      email: 'contact@stark.example.com',
      phone: '+1-555-500-0005',
      address: '5 Iron Way, Malibu',
      createdAt: past,
      updatedAt: past,
    },
    {
      id: C6_ID,
      name: 'Wayne Enterprises',
      legalName: 'Wayne Enterprises Ltd',
      websiteUrl: 'https://wayne.example.com',
      email: 'info@wayne.example.com',
      phone: '+1-555-600-0006',
      address: '6 Wayne Manor, Gotham',
      createdAt: past,
      updatedAt: past,
    },
    {
      id: C7_ID,
      name: 'Cyberdyne Systems',
      legalName: 'Cyberdyne Systems Corporation',
      websiteUrl: 'https://cyberdyne.example.com',
      email: 'admin@cyberdyne.example.com',
      phone: '+1-555-700-0007',
      address: '7 Innovation Blvd, Los Angeles',
      createdAt: past,
      updatedAt: past,
    },
    {
      id: C8_ID,
      name: 'Weyland Corp',
      legalName: 'Weyland Corporation',
      websiteUrl: 'https://weyland.example.com',
      email: 'support@weyland.example.com',
      phone: '+1-555-800-0008',
      address: '8 Colony Rd, New York',
      createdAt: past,
      updatedAt: past,
    },
    {
      id: C9_ID,
      name: 'Oscorp',
      legalName: 'Oscorp Industries',
      websiteUrl: 'https://oscorp.example.com',
      email: 'contact@oscorp.example.com',
      phone: '+1-555-900-0009',
      address: '9 Science Ave, New York',
      createdAt: past,
      updatedAt: past,
    },
    {
      id: C10_ID,
      name: 'LexCorp',
      legalName: 'LexCorp International',
      websiteUrl: 'https://lexcorp.example.com',
      email: 'info@lexcorp.example.com',
      phone: '+1-555-010-0010',
      address: '10 Corporate Plaza, Metropolis',
      createdAt: past,
      updatedAt: past,
    },
    {
      id: C11_ID,
      name: 'Tyrell Corp',
      legalName: 'Tyrell Corporation',
      websiteUrl: 'https://tyrell.example.com',
      email: 'replicants@tyrell.example.com',
      phone: '+1-555-011-0011',
      address: '11 Nexus Tower, Los Angeles',
      createdAt: past,
      updatedAt: past,
    },
    {
      id: C12_ID,
      name: 'Soylent Corp',
      legalName: 'Soylent Corporation',
      websiteUrl: 'https://soylent.example.com',
      email: 'hello@soylent.example.com',
      phone: '+1-555-012-0012',
      address: '12 Green St, New York',
      createdAt: past,
      updatedAt: past,
    },
  ];

  const users: User[] = [
    // C1: Acme Corp
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
    // C2: Globex Inc
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
    // C3: Initech
    {
      id: U5_ID,
      companyId: C3_ID,
      name: 'Eve Admin',
      email: 'eve@initech.example.com',
      isAdmin: true,
      title: 'VP Engineering',
      phone: '+1-555-301-0001',
      createdAt: past,
      updatedAt: past,
    },
    {
      id: U6_ID,
      companyId: C3_ID,
      name: 'Frank User',
      email: 'frank@initech.example.com',
      isAdmin: false,
      title: 'QA Engineer',
      phone: '+1-555-301-0002',
      createdAt: past,
      updatedAt: past,
    },
    // C4: Umbrella Corp
    {
      id: U7_ID,
      companyId: C4_ID,
      name: 'Grace Admin',
      email: 'grace@umbrella.example.com',
      isAdmin: true,
      title: 'Director',
      phone: '+1-555-401-0001',
      createdAt: past,
      updatedAt: past,
    },
    {
      id: U8_ID,
      companyId: C4_ID,
      name: 'Hank User',
      email: 'hank@umbrella.example.com',
      isAdmin: false,
      title: 'Researcher',
      phone: '+1-555-401-0002',
      createdAt: past,
      updatedAt: past,
    },
    // C5: Stark Industries
    {
      id: U9_ID,
      companyId: C5_ID,
      name: 'Ivy Admin',
      email: 'ivy@stark.example.com',
      isAdmin: true,
      title: 'COO',
      phone: '+1-555-501-0001',
      createdAt: past,
      updatedAt: past,
    },
    {
      id: U10_ID,
      companyId: C5_ID,
      name: 'Jack User',
      email: 'jack@stark.example.com',
      isAdmin: false,
      title: 'Engineer',
      phone: '+1-555-501-0002',
      createdAt: past,
      updatedAt: past,
    },
    // C6: Wayne Enterprises
    {
      id: U11_ID,
      companyId: C6_ID,
      name: 'Karen Admin',
      email: 'karen@wayne.example.com',
      isAdmin: true,
      title: 'CFO',
      phone: '+1-555-601-0001',
      createdAt: past,
      updatedAt: past,
    },
    {
      id: U12_ID,
      companyId: C6_ID,
      name: 'Leo User',
      email: 'leo@wayne.example.com',
      isAdmin: false,
      title: 'Analyst',
      phone: '+1-555-601-0002',
      createdAt: past,
      updatedAt: past,
    },
    // C7: Cyberdyne Systems
    {
      id: U13_ID,
      companyId: C7_ID,
      name: 'Mia Admin',
      email: 'mia@cyberdyne.example.com',
      isAdmin: true,
      title: 'CTO',
      phone: '+1-555-701-0001',
      createdAt: past,
      updatedAt: past,
    },
    {
      id: U14_ID,
      companyId: C7_ID,
      name: 'Nick User',
      email: 'nick@cyberdyne.example.com',
      isAdmin: false,
      title: 'Robotics Engineer',
      phone: '+1-555-701-0002',
      createdAt: past,
      updatedAt: past,
    },
    // C8: Weyland Corp
    {
      id: U15_ID,
      companyId: C8_ID,
      name: 'Olivia Admin',
      email: 'olivia@weyland.example.com',
      isAdmin: true,
      title: 'CEO',
      phone: '+1-555-801-0001',
      createdAt: past,
      updatedAt: past,
    },
    {
      id: U16_ID,
      companyId: C8_ID,
      name: 'Paul User',
      email: 'paul@weyland.example.com',
      isAdmin: false,
      title: 'Geologist',
      phone: '+1-555-801-0002',
      createdAt: past,
      updatedAt: past,
    },
    // C9: Oscorp
    {
      id: U17_ID,
      companyId: C9_ID,
      name: 'Quinn Admin',
      email: 'quinn@oscorp.example.com',
      isAdmin: true,
      title: 'Lead Scientist',
      phone: '+1-555-901-0001',
      createdAt: past,
      updatedAt: past,
    },
    {
      id: U18_ID,
      companyId: C9_ID,
      name: 'Rachel User',
      email: 'rachel@oscorp.example.com',
      isAdmin: false,
      title: 'Lab Technician',
      phone: '+1-555-901-0002',
      createdAt: past,
      updatedAt: past,
    },
    // C10: LexCorp
    {
      id: U19_ID,
      companyId: C10_ID,
      name: 'Sam Admin',
      email: 'sam@lexcorp.example.com',
      isAdmin: true,
      title: 'President',
      phone: '+1-555-011-0001',
      createdAt: past,
      updatedAt: past,
    },
    {
      id: U20_ID,
      companyId: C10_ID,
      name: 'Tina User',
      email: 'tina@lexcorp.example.com',
      isAdmin: false,
      title: 'Strategist',
      phone: '+1-555-011-0002',
      createdAt: past,
      updatedAt: past,
    },
    // C11: Tyrell Corp
    {
      id: U21_ID,
      companyId: C11_ID,
      name: 'Uma Admin',
      email: 'uma@tyrell.example.com',
      isAdmin: true,
      title: 'Chief Scientist',
      phone: '+1-555-121-0001',
      createdAt: past,
      updatedAt: past,
    },
    {
      id: U22_ID,
      companyId: C11_ID,
      name: 'Victor User',
      email: 'victor@tyrell.example.com',
      isAdmin: false,
      title: 'Geneticist',
      phone: '+1-555-121-0002',
      createdAt: past,
      updatedAt: past,
    },
    // C12: Soylent Corp
    {
      id: U23_ID,
      companyId: C12_ID,
      name: 'Wendy Admin',
      email: 'wendy@soylent.example.com',
      isAdmin: true,
      title: 'VP Operations',
      phone: '+1-555-122-0001',
      createdAt: past,
      updatedAt: past,
    },
    {
      id: U24_ID,
      companyId: C12_ID,
      name: 'Xander User',
      email: 'xander@soylent.example.com',
      isAdmin: false,
      title: 'Supply Chain Manager',
      phone: '+1-555-122-0002',
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
      startedAt: older,
      canceledAt: past,
      createdByUserId: U3_ID,
      canceledByUserId: U3_ID,
      createdAt: older,
      updatedAt: past,
    },
    {
      id: S3_ID,
      companyId: C3_ID,
      planCode: 'BASIC_MONTHLY',
      planName: 'Basic Monthly',
      price: 250,
      status: 'ACTIVE',
      startedAt: past,
      canceledAt: null,
      createdByUserId: U5_ID,
      canceledByUserId: null,
      createdAt: past,
      updatedAt: past,
    },
    {
      id: S4_ID,
      companyId: C4_ID,
      planCode: 'STANDARD_YEARLY',
      planName: 'Standard Yearly',
      price: 7500,
      status: 'ACTIVE',
      startedAt: past,
      canceledAt: null,
      createdByUserId: U7_ID,
      canceledByUserId: null,
      createdAt: past,
      updatedAt: past,
    },
    {
      id: S5_ID,
      companyId: C5_ID,
      planCode: 'STANDARD_MONTHLY',
      planName: 'Standard Monthly',
      price: 750,
      status: 'CANCELED',
      startedAt: older,
      canceledAt: past,
      createdByUserId: U9_ID,
      canceledByUserId: U9_ID,
      createdAt: older,
      updatedAt: past,
    },
    {
      id: S6_ID,
      companyId: C6_ID,
      planCode: 'BASIC_MONTHLY',
      planName: 'Basic Monthly',
      price: 250,
      status: 'ACTIVE',
      startedAt: past,
      canceledAt: null,
      createdByUserId: U11_ID,
      canceledByUserId: null,
      createdAt: past,
      updatedAt: past,
    },
    {
      id: S7_ID,
      companyId: C7_ID,
      planCode: 'BASIC_YEARLY',
      planName: 'Basic Yearly',
      price: 2500,
      status: 'ACTIVE',
      startedAt: past,
      canceledAt: null,
      createdByUserId: U13_ID,
      canceledByUserId: null,
      createdAt: past,
      updatedAt: past,
    },
    {
      id: S8_ID,
      companyId: C8_ID,
      planCode: 'STANDARD_YEARLY',
      planName: 'Standard Yearly',
      price: 7500,
      status: 'CANCELED',
      startedAt: older,
      canceledAt: past,
      createdByUserId: U15_ID,
      canceledByUserId: U15_ID,
      createdAt: older,
      updatedAt: past,
    },
  ];

  return { companies, users, subscriptions };
}
