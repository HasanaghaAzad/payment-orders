import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from '../ormconfig';
import { OrderModule } from './api/order/order.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), OrderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
