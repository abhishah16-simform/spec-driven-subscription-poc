import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SubscriptionService } from './subscription.service';
import { BuySubscriptionDto } from './dto/buy-subscription.dto';
import { CancelSubscriptionDto } from './dto/cancel-subscription.dto';
import { SubscriptionResponseDto } from './dto/subscription-response.dto';

@ApiTags('subscriptions')
@Controller('subscriptions')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Get(':companyId')
  @ApiOperation({ summary: 'Get latest subscription details for company' })
  @ApiOkResponse({ type: SubscriptionResponseDto })
  @ApiNotFoundResponse({ description: 'Company not found' })
  @ApiBadRequestResponse({ description: 'No subscription found' })
  getLatest(@Param('companyId') companyId: string): SubscriptionResponseDto {
    return this.subscriptionService.getLatest(companyId);
  }

  @Post(':companyId/buy')
  @ApiOperation({
    summary: 'Buy subscription for company (admin-only via actorUserId)',
  })
  @ApiCreatedResponse({ type: SubscriptionResponseDto })
  @ApiBadRequestResponse({ description: 'Validation or plan/business-rule error' })
  @ApiForbiddenResponse({ description: 'Actor not admin or wrong company' })
  @ApiNotFoundResponse({ description: 'Company or actor not found' })
  @ApiConflictResponse({ description: 'Active subscription already exists' })
  buy(
    @Param('companyId') companyId: string,
    @Body() dto: BuySubscriptionDto,
  ): SubscriptionResponseDto {
    return this.subscriptionService.buy(companyId, dto);
  }

  @Post(':companyId/cancel')
  @ApiOperation({
    summary: 'Cancel active subscription for company (admin-only via actorUserId)',
  })
  @ApiOkResponse({ type: SubscriptionResponseDto })
  @ApiBadRequestResponse({ description: 'Validation or business-rule error' })
  @ApiForbiddenResponse({ description: 'Actor not admin or wrong company' })
  @ApiNotFoundResponse({ description: 'Company or actor not found' })
  cancel(
    @Param('companyId') companyId: string,
    @Body() dto: CancelSubscriptionDto,
  ): SubscriptionResponseDto {
    return this.subscriptionService.cancel(companyId, dto);
  }
}
