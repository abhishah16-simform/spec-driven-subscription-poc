import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SubscriptionResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() companyId: string;
  @ApiProperty() planCode: string;
  @ApiProperty() planName: string;
  @ApiProperty() price: number;
  @ApiProperty({ enum: ['ACTIVE', 'CANCELED'] }) status: string;
  @ApiProperty() startedAt: string;
  @ApiPropertyOptional() canceledAt: string | null;
  @ApiProperty() createdByUserId: string;
  @ApiPropertyOptional() canceledByUserId: string | null;
  @ApiProperty() createdAt: string;
  @ApiProperty() updatedAt: string;
}
