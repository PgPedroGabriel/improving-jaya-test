import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { EventsModule } from '../src/modules/events/events.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event as EventEntity } from '../src/modules/events/entities/event.entity';
import { EventsService } from '../src/modules/events/events.service';
import { WebhookModule } from '../src/modules/webhook/webhook.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventsService],
      imports: [
        EventsModule,
        WebhookModule,
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
    await app.init();
  });

  it('/ (POST) / webhook / github', async () => {
    const res = await request(app.getHttpServer())
      .post('/webhook/github')
      .send({
        action: 'opened',
        issue: {
          number: 1,
        },
        repository: {
          name: 'repository-name',
        },
      })
      .expect(201);

    expect(res.body).toEqual(
      expect.objectContaining({
        action: 'opened',
        repository: 'repository-name',
        issue_number: 1,
        id: expect.any(String),
        created_at: expect.any(String),
      }),
    );
  });
});
