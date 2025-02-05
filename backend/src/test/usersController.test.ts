import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import UsersController from '../controllers/users.controller';
import { UserCollection } from '../collections/users.collection';

jest.mock('../collections/users.collection');

const app = express();

app.use(bodyParser.json());
app.post('/users', UsersController.saveUser);

describe('UsersController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a new user', async () => {
    const mockInsertOne = jest.fn().mockResolvedValue({ insertedId: '12345' });
    (UserCollection as jest.Mock).mockReturnValue({
      insertOne: mockInsertOne,
    });

    const newUser = {
      user: 'John Doe',
      interest: ['reading', 'gaming'],
      age: 30,
      mobile: 1234567890,
      email: 'john.doe@example.com',
    };

    const response = await request(app).post('/users').send(newUser);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Successfully registered!');
    expect(mockInsertOne).toHaveBeenCalledWith(newUser);
  });

  // Additional test cases for other methods can be added here
});
