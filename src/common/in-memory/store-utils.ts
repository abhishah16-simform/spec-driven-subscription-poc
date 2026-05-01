import { randomUUID } from 'crypto';

export function generateId(): string {
  return randomUUID();
}

export function nowIso(): string {
  return new Date().toISOString();
}
