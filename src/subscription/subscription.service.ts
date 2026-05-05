import { Injectable } from '@nestjs/common';
import { InMemoryStoreService } from '../common/in-memory/in-memory-store.service';
import { Subscription } from '../common/in-memory/domain.types';
import { generateId, nowIso } from '../common/in-memory/store-utils';
import { getPlanByCode } from './plan-catalog';
import { conflict, forbidden, notFound } from '../common/errors/domain-errors';
import { BuySubscriptionDto } from './dto/buy-subscription.dto';
import { CancelSubscriptionDto } from './dto/cancel-subscription.dto';
import { SubscriptionResponseDto } from './dto/subscription-response.dto';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class SubscriptionService {
  constructor(private readonly store: InMemoryStoreService) {}

  private toDto(s: Subscription): SubscriptionResponseDto {
    return {
      id: s.id,
      companyId: s.companyId,
      planCode: s.planCode,
      planName: s.planName,
      price: s.price,
      status: s.status,
      startedAt: s.startedAt,
      canceledAt: s.canceledAt,
      createdByUserId: s.createdByUserId,
      canceledByUserId: s.canceledByUserId,
      createdAt: s.createdAt,
      updatedAt: s.updatedAt,
    };
  }

  private resolveAdminActor(companyId: string, actorUserId: string): void {
    const company = this.store.getCompanyById(companyId);
    if (!company) notFound('Company', companyId);

    const actor = this.store.getUserById(actorUserId);
    if (!actor) notFound('User', actorUserId);

    if (actor.companyId !== companyId)
      forbidden(`User '${actorUserId}' does not belong to company '${companyId}'`);

    if (!actor.isAdmin)
      forbidden(`User '${actorUserId}' is not an admin`);
  }

  getLatest(companyId: string): SubscriptionResponseDto {
    if (!this.store.getCompanyById(companyId)) notFound('Company', companyId);
    const sub = this.store.getLatestSubscriptionForCompany(companyId);
    if (!sub)
      throw new BadRequestException(
        `No subscription found for company '${companyId}'`,
      );
    return this.toDto(sub);
  }

  buy(companyId: string, dto: BuySubscriptionDto): SubscriptionResponseDto {
    this.resolveAdminActor(companyId, dto.actorUserId);

    const plan = getPlanByCode(dto.planCode);
    if (!plan)
      throw new BadRequestException(
        `Unknown plan code '${dto.planCode}'. Valid codes: BASIC_MONTHLY, BASIC_YEARLY, STANDARD_MONTHLY, STANDARD_YEARLY`,
      );

    const existing = this.store.getActiveSubscriptionForCompany(companyId);
    if (existing)
      conflict(
        `Company '${companyId}' already has an active subscription. Cancel it before purchasing a new one.`,
      );

    const now = nowIso();
    const sub: Subscription = {
      id: generateId(),
      companyId,
      planCode: plan.code,
      planName: plan.displayName,
      price: plan.price,
      status: 'ACTIVE',
      startedAt: now,
      canceledAt: null,
      createdByUserId: dto.actorUserId,
      canceledByUserId: null,
      createdAt: now,
      updatedAt: now,
    };
    return this.toDto(this.store.saveSubscription(sub));
  }

  cancel(companyId: string, dto: CancelSubscriptionDto): SubscriptionResponseDto {
    this.resolveAdminActor(companyId, dto.actorUserId);

    const active = this.store.getActiveSubscriptionForCompany(companyId);
    if (!active)
      throw new BadRequestException(
        `No active subscription found for company '${companyId}'`,
      );

    const now = nowIso();
    const canceled: Subscription = {
      ...active,
      status: 'CANCELED',
      canceledAt: now,
      canceledByUserId: dto.actorUserId,
      updatedAt: now,
    };
    return this.toDto(this.store.saveSubscription(canceled));
  }
}
