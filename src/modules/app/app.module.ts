import { Module } from '@nestjs/common';
import { EventsModule } from '../events/events.module';
import DataBaseModule from '../../ormconfig';
import { IssuesModule } from '../issues/issues.module';
import { WebhookModule } from '../webhook/webhook.module';

@Module({
  imports: [DataBaseModule, IssuesModule, EventsModule, WebhookModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
