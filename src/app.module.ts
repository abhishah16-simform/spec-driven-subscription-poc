import { Module } from '@nestjs/common';
import { CompanyModule } from './company/company.module';
import { UserModule } from './user/user.module';
import { SubscriptionModule } from './subscription/subscription.module';

@Module({
  imports: [CompanyModule, UserModule, SubscriptionModule],
})
export class AppModule {}
