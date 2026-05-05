import { Injectable } from '@nestjs/common';
import { InMemoryStoreService } from '../common/in-memory/in-memory-store.service';
import { User } from '../common/in-memory/domain.types';
import { generateId, nowIso } from '../common/in-memory/store-utils';
import { paginate } from '../common/in-memory/pagination';
import { PaginatedResponseDto } from '../common/dto/api-response.dto';
import { conflict, notFound } from '../common/errors/domain-errors';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UserService {
  constructor(private readonly store: InMemoryStoreService) {}

  private toDto(u: User): UserResponseDto {
    return {
      id: u.id,
      companyId: u.companyId,
      name: u.name,
      email: u.email,
      isAdmin: u.isAdmin,
      phone: u.phone,
      title: u.title,
      createdAt: u.createdAt,
      updatedAt: u.updatedAt,
    };
  }

  private assertUniqueEmail(email: string, excludeId?: string): void {
    const conflict_ = this.store
      .getAllUsers()
      .find((u) => u.email === email && u.id !== excludeId);
    if (conflict_) conflict(`Email '${email}' is already in use`);
  }

  list(
    page: number,
    limit: number,
    companyId?: string,
  ): PaginatedResponseDto<UserResponseDto> {
    let all = this.store.getAllUsers();
    if (companyId) all = all.filter((u) => u.companyId === companyId);
    return paginate(all.map(this.toDto), page, limit);
  }

  findOne(id: string): UserResponseDto {
    const user = this.store.getUserById(id);
    if (!user) notFound('User', id);
    return this.toDto(user);
  }

  create(dto: CreateUserDto): UserResponseDto {
    if (!this.store.getCompanyById(dto.companyId))
      notFound('Company', dto.companyId);
    this.assertUniqueEmail(dto.email);
    const now = nowIso();
    const user: User = {
      id: generateId(),
      companyId: dto.companyId,
      name: dto.name,
      email: dto.email,
      isAdmin: dto.isAdmin,
      phone: dto.phone,
      title: dto.title,
      createdAt: now,
      updatedAt: now,
    };
    return this.toDto(this.store.saveUser(user));
  }

  update(id: string, dto: UpdateUserDto): UserResponseDto {
    const existing = this.store.getUserById(id);
    if (!existing) notFound('User', id);
    if (dto.email && dto.email !== existing.email)
      this.assertUniqueEmail(dto.email, id);
    const updated: User = {
      ...existing,
      name: dto.name ?? existing.name,
      email: dto.email ?? existing.email,
      isAdmin: dto.isAdmin !== undefined ? dto.isAdmin : existing.isAdmin,
      phone: dto.phone !== undefined ? dto.phone : existing.phone,
      title: dto.title !== undefined ? dto.title : existing.title,
      updatedAt: nowIso(),
    };
    return this.toDto(this.store.saveUser(updated));
  }

  remove(id: string): void {
    if (!this.store.getUserById(id)) notFound('User', id);
    this.store.deleteUser(id);
  }
}
