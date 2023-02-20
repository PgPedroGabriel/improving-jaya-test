import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { EventsModule } from '../src/modules/events/events.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event as EventEntity } from '../src/modules/events/entities/event.entity';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        EventsModule,
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          entities: [EventEntity],
          logging: true,
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (POST)', (done) => {
    request(app.getHttpServer())
      .post('/events')
      .send({
        action: 'Action test',
        repository: 'Repository test',
        issue_number: 2550,
      })
      .expect(201)
      .end((err, res) => {
        if (err) done(err);
        expect(res.body).toEqual(
          expect.objectContaining({
            action: 'Action test',
            repository: 'Repository test',
            issue_number: 2550,
            id: expect.any(String),
            created_at: expect.any(String),
          }),
        );
        done();
      });
  });
});
