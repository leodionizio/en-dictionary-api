import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it('should sign up a new user and return an access token', async () => {
    const createUserDto = {
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password123',
    };

    const response = await request(app.getHttpServer())
      .post('/auth/signup')
      .send(createUserDto)
      .expect(201);

    expect(response.body).toHaveProperty('access_token');
    expect(response.body).toHaveProperty('id');
  });

  it('should sign in with valid credentials and return an access token', async () => {
    const loginDto = { email: 'johndoe@example.com', password: 'password123' };

    const response = await request(app.getHttpServer())
      .post('/auth/signin')
      .send(loginDto)
      .expect(200);

    expect(response.body).toHaveProperty('access_token');
    expect(response.body.email).toBe('johndoe@example.com');
  });

  afterAll(async () => {
    await app.close();
  });
});
