import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryService } from './history.service';
import { History } from './history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([History])],
  controllers: [],
  providers: [HistoryService],
  exports: [HistoryService],
})
export class HistoryModule {}
