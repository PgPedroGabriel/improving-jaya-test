import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { Event as EventEntity } from './entities/event.entity';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

describe('EventsController', () => {
  let controller: EventsController;
  let repository: Repository<EventEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [
        EventsService,
        {
          provide: getRepositoryToken(EventEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<EventsController>(EventsController);
    repository = module.get<Repository<EventEntity>>(
      getRepositoryToken(EventEntity),
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('create should call service.create function with parameters', async () => {
    const event = {
      id: randomUUID(),
      action: 'closed',
      issue_number: 123,
      repository: 'repository',
      created_at: new Date(),
    };

    repository.save = jest.fn().mockResolvedValue(event);

    const response = await controller.create({
      ...event,
    });

    expect(response).toStrictEqual(event);
  });
});
