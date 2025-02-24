import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from '../ormconfig';
import { OrderModule } from './order/order.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
