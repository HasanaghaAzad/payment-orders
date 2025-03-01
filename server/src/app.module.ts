import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from '../ormconfig';
import { OrderModule } from './api/order/order.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), OrderModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
