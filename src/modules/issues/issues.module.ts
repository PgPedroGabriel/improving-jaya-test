import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from '../events/entities/event.entity';
import { EventsService } from '../events/events.service';
import { IssuesController } from './issues.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  controllers: [IssuesController],
  providers: [EventsService],
})
export class IssuesModule {}
