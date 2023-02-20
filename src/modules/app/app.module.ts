import { Module } from '@nestjs/common';
import { EventsModule } from '../events/events.module';
import DataBaseModule from '../../ormconfig';
import { IssuesModule } from '../issues/issues.module';

@Module({
  imports: [DataBaseModule, IssuesModule, EventsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
