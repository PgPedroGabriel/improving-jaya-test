import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { EventsModule } from '../src/modules/events/events.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event as EventEntity } from '../src/modules/events/entities/event.entity';
import { EventsService } from '../src/modules/events/events.service';
import { IssuesModule } from '../src/modules/issues/issues.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let eventsService: EventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventsService],
      imports: [
        EventsModule,
        IssuesModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [EventEntity],
          logging: true,
          synchronize: true,
        }),
        TypeOrmModule.forFeature([EventEntity]),
      ],
    }).compile();

    app = module.createNestApplication();
    eventsService = module.get<EventsService>(EventsService);
    await app.init();
  });

  it('/ (GET) / :issue_number / events', async () => {
    const response = await request(app.getHttpServer())
      .get('/issues/1111/events')
      .expect(200);

    expect(response.body).toStrictEqual([]);

    const event1 = await eventsService.create({
      action: 'Action test',
      repository: 'Repository test',
      issue_number: 2550,
    });
    const event2 = await eventsService.create({
      action: 'Action test 2',
      repository: 'Repository test 2',
      issue_number: 2550,
    });
    const event3 = await eventsService.create({
      action: 'A different issue',
      repository: 'Repository',
      issue_number: 1111,
    });

    const response2 = await request(app.getHttpServer())
      .get('/issues/1111/events')
      .expect(200);

    expect(response2.body).toEqual(
      expect.objectContaining([
        {
          action: 'A different issue',
          repository: 'Repository',
          issue_number: 1111,
          id: expect.any(String),
          created_at: expect.any(String),
        },
      ]),
    );
  });
});
