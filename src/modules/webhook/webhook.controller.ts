import { Controller, Post, Body } from '@nestjs/common';
import { CreateEventDto } from '../events/dto/create-event.dto';

import { EventsService } from '../events/events.service';
import { GithubIssueDto } from './dto/github-issue.dto';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly eventsService: EventsService) {}

  @Post('/github')
  async create(@Body() githubIssueDto: GithubIssueDto) {
    const createEventDto = new CreateEventDto();

    createEventDto.action = githubIssueDto?.action;
    createEventDto.issue_number = githubIssueDto?.issue?.number;
    createEventDto.repository = githubIssueDto?.repository?.name;

    const event = await this.eventsService.create(createEventDto);

    return event;
  }
}
