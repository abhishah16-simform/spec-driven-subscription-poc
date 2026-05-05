import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiConflictResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompanyResponseDto } from './dto/company-response.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { PaginatedResponseDto } from '../common/dto/api-response.dto';

@ApiTags('companies')
@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Get()
  @ApiOperation({ summary: 'List companies (paginated)' })
  @ApiOkResponse({ description: 'Paginated company list' })
  list(
    @Query() query: PaginationQueryDto,
  ): PaginatedResponseDto<CompanyResponseDto> {
    return this.companyService.list(query.page, query.limit);
  }

  @Get(':companyId')
  @ApiOperation({ summary: 'Get company by id' })
  @ApiOkResponse({ type: CompanyResponseDto })
  @ApiNotFoundResponse({ description: 'Company not found' })
  findOne(@Param('companyId') companyId: string): CompanyResponseDto {
    return this.companyService.findOne(companyId);
  }

  @Post()
  @ApiOperation({ summary: 'Create company' })
  @ApiCreatedResponse({ type: CompanyResponseDto })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @ApiConflictResponse({ description: 'name or legalName already in use' })
  create(@Body() dto: CreateCompanyDto): CompanyResponseDto {
    return this.companyService.create(dto);
  }

  @Patch(':companyId')
  @ApiOperation({ summary: 'Update company' })
  @ApiOkResponse({ type: CompanyResponseDto })
  @ApiBadRequestResponse({ description: 'Validation error' })
  @ApiNotFoundResponse({ description: 'Company not found' })
  @ApiConflictResponse({ description: 'name or legalName already in use' })
  update(
    @Param('companyId') companyId: string,
    @Body() dto: UpdateCompanyDto,
  ): CompanyResponseDto {
    return this.companyService.update(companyId, dto);
  }

  @Delete(':companyId')
  @HttpCode(204)
  @ApiOperation({ summary: 'Delete company and cascade users/subscriptions' })
  @ApiNoContentResponse({ description: 'Deleted' })
  @ApiNotFoundResponse({ description: 'Company not found' })
  remove(@Param('companyId') companyId: string): void {
    this.companyService.remove(companyId);
  }
}
