import { Injectable } from '@nestjs/common';
import { InMemoryStoreService } from '../common/in-memory/in-memory-store.service';
import { Company } from '../common/in-memory/domain.types';
import { generateId, nowIso } from '../common/in-memory/store-utils';
import { paginate } from '../common/in-memory/pagination';
import { PaginatedResponseDto } from '../common/dto/api-response.dto';
import { conflict, notFound } from '../common/errors/domain-errors';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompanyResponseDto } from './dto/company-response.dto';

@Injectable()
export class CompanyService {
  constructor(private readonly store: InMemoryStoreService) {}

  private toDto(c: Company): CompanyResponseDto {
    return {
      id: c.id,
      name: c.name,
      legalName: c.legalName,
      websiteUrl: c.websiteUrl,
      email: c.email,
      phone: c.phone,
      address: c.address,
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
    };
  }

  private assertUniqueName(
    name: string,
    legalName: string,
    excludeId?: string,
  ): void {
    const all = this.store.getAllCompanies();
    const nameConflict = all.find(
      (c) => c.name === name && c.id !== excludeId,
    );
    if (nameConflict) conflict(`Company name '${name}' is already in use`);

    const legalNameConflict = all.find(
      (c) => c.legalName === legalName && c.id !== excludeId,
    );
    if (legalNameConflict)
      conflict(`Company legalName '${legalName}' is already in use`);
  }

  list(page: number, limit: number): PaginatedResponseDto<CompanyResponseDto> {
    const all = this.store.getAllCompanies().map(this.toDto);
    return paginate(all, page, limit);
  }

  findOne(id: string): CompanyResponseDto {
    const company = this.store.getCompanyById(id);
    if (!company) notFound('Company', id);
    return this.toDto(company);
  }

  create(dto: CreateCompanyDto): CompanyResponseDto {
    this.assertUniqueName(dto.name, dto.legalName);
    const now = nowIso();
    const company: Company = {
      id: generateId(),
      name: dto.name,
      legalName: dto.legalName,
      websiteUrl: dto.websiteUrl,
      email: dto.email,
      phone: dto.phone,
      address: dto.address,
      createdAt: now,
      updatedAt: now,
    };
    return this.toDto(this.store.saveCompany(company));
  }

  update(id: string, dto: UpdateCompanyDto): CompanyResponseDto {
    const existing = this.store.getCompanyById(id);
    if (!existing) notFound('Company', id);

    const newName = dto.name ?? existing.name;
    const newLegalName = dto.legalName ?? existing.legalName;
    this.assertUniqueName(newName, newLegalName, id);

    const updated: Company = {
      ...existing,
      name: newName,
      legalName: newLegalName,
      websiteUrl: dto.websiteUrl !== undefined ? dto.websiteUrl : existing.websiteUrl,
      email: dto.email !== undefined ? dto.email : existing.email,
      phone: dto.phone !== undefined ? dto.phone : existing.phone,
      address: dto.address !== undefined ? dto.address : existing.address,
      updatedAt: nowIso(),
    };
    return this.toDto(this.store.saveCompany(updated));
  }

  remove(id: string): void {
    if (!this.store.getCompanyById(id)) notFound('Company', id);
    this.store.deleteCompany(id);
  }
}
