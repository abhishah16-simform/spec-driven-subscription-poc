import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { PlanCode } from '../../common/in-memory/domain.types';

export enum PlanCodeEnum {
  BASIC_MONTHLY = 'BASIC_MONTHLY',
  BASIC_YEARLY = 'BASIC_YEARLY',
  STANDARD_MONTHLY = 'STANDARD_MONTHLY',
  STANDARD_YEARLY = 'STANDARD_YEARLY',
}

export class BuySubscriptionDto {
  @ApiProperty({ example: 'u1000000-0000-0000-0000-000000000001' })
  @IsString()
  @IsNotEmpty()
  actorUserId: string;

  @ApiProperty({ enum: PlanCodeEnum, example: PlanCodeEnum.BASIC_MONTHLY })
  @IsEnum(PlanCodeEnum)
  planCode: PlanCode;
}
