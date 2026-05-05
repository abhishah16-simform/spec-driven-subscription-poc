import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CompanyResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() name: string;
  @ApiProperty() legalName: string;
  @ApiPropertyOptional() websiteUrl?: string;
  @ApiPropertyOptional() email?: string;
  @ApiPropertyOptional() phone?: string;
  @ApiPropertyOptional() address?: string;
  @ApiProperty() createdAt: string;
  @ApiProperty() updatedAt: string;
}
