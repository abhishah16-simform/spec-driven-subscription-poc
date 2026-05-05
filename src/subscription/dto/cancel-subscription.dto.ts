import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CancelSubscriptionDto {
  @ApiProperty({ example: 'u1000000-0000-0000-0000-000000000001' })
  @IsString()
  @IsNotEmpty()
  actorUserId: string;
}
