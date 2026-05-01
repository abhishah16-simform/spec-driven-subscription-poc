import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { InMemoryStoreService } from '../common/in-memory/in-memory-store.service';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService, InMemoryStoreService],
  exports: [InMemoryStoreService],
})
export class CompanyModule {}
