import { Module } from '@nestjs/common';
import { EventsService } from '../events/events.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event as EventEntity } from '../events/entities/event.entity';
import { WebhookController } from './webhook.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EventEntity])],
  controllers: [WebhookController],
  providers: [EventsService],
})
export class WebhookModule {}
