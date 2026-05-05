import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty() id: string;
  @ApiProperty() companyId: string;
  @ApiProperty() name: string;
  @ApiProperty() email: string;
  @ApiProperty() isAdmin: boolean;
  @ApiPropertyOptional() phone?: string;
  @ApiPropertyOptional() title?: string;
  @ApiProperty() createdAt: string;
  @ApiProperty() updatedAt: string;
}
