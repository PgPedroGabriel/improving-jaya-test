import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { Event as EventEntity } from './entities/event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(EventEntity)
    private eventsRepository: Repository<EventEntity>,
  ) {}

  async create(createEventDto: CreateEventDto) {
    const id = randomUUID();
    const event = createEventDto as EventEntity;
    event.id = id;
    return await this.eventsRepository.save(event);
  }

  async findByIssueNumber(issue_number: number): Promise<EventEntity[]> {
    return await this.eventsRepository.findBy({ issue_number });
  }
}
