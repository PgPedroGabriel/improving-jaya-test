import { Controller, Get, Param } from '@nestjs/common';
import { EventsService } from '../events/events.service';

@Controller('issues')
export class IssuesController {
  constructor(private readonly eventsService: EventsService) {}

  @Get(':issue_number/events')
  async findEvents(@Param('issue_number') issue_number: string) {
    const issues = await this.eventsService.findByIssueNumber(+issue_number);
    return issues;
  }
}
