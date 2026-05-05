import { Injectable } from '@nestjs/common';
import { Company, User, Subscription } from './domain.types';
import { buildSeedData } from './seed-data';

@Injectable()
export class InMemoryStoreService {
  private companies: Map<string, Company> = new Map();
  private users: Map<string, User> = new Map();
  private subscriptions: Map<string, Subscription> = new Map();

  constructor() {
    this.seed();
  }

  private seed(): void {
    const { companies, users, subscriptions } = buildSeedData();
    companies.forEach((c) => this.companies.set(c.id, c));
    users.forEach((u) => this.users.set(u.id, u));
    subscriptions.forEach((s) => this.subscriptions.set(s.id, s));
  }

  // ── Companies ─────────────────────────────────────────────────────────────

  getAllCompanies(): Company[] {
    return Array.from(this.companies.values());
  }

  getCompanyById(id: string): Company | undefined {
    return this.companies.get(id);
  }

  saveCompany(company: Company): Company {
    this.companies.set(company.id, company);
    return company;
  }

  deleteCompany(id: string): void {
    this.companies.delete(id);
    // Cascade: remove users and subscriptions belonging to this company
    for (const [uid, user] of this.users) {
      if (user.companyId === id) this.users.delete(uid);
    }
    for (const [sid, sub] of this.subscriptions) {
      if (sub.companyId === id) this.subscriptions.delete(sid);
    }
  }

  // ── Users ──────────────────────────────────────────────────────────────────

  getAllUsers(): User[] {
    return Array.from(this.users.values());
  }

  getUserById(id: string): User | undefined {
    return this.users.get(id);
  }

  saveUser(user: User): User {
    this.users.set(user.id, user);
    return user;
  }

  deleteUser(id: string): void {
    this.users.delete(id);
  }

  // ── Subscriptions ─────────────────────────────────────────────────────────

  getAllSubscriptions(): Subscription[] {
    return Array.from(this.subscriptions.values());
  }

  getSubscriptionById(id: string): Subscription | undefined {
    return this.subscriptions.get(id);
  }

  saveSubscription(sub: Subscription): Subscription {
    this.subscriptions.set(sub.id, sub);
    return sub;
  }

  getLatestSubscriptionForCompany(companyId: string): Subscription | undefined {
    const subs = Array.from(this.subscriptions.values()).filter(
      (s) => s.companyId === companyId,
    );
    if (subs.length === 0) return undefined;
    return subs.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )[0];
  }

  getActiveSubscriptionForCompany(companyId: string): Subscription | undefined {
    return Array.from(this.subscriptions.values()).find(
      (s) => s.companyId === companyId && s.status === 'ACTIVE',
    );
  }
}
