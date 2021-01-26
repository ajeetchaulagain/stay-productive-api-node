import request from 'supertest';

import app from '../../../testEnvServer';
import { User } from '../../../models/user';

describe('auth middleware', () => {
  afterEach(async () => {
    await User.remove();
  });

  let token;

  beforeEach(() => {});

  // eslint-disable-next-line arrow-body-style
  const sendRequest = () => {
    return request(app).get('/api/projects').set('x-auth-token', token);
  };

  it('should return 401 if token is not provided', async () => {
    const user = new User({
      name: 'Test User 2',
      email: 'test2@gmail.com',
      password: 'testPassword',
    });
    await user.save();
    // empty token is passed rather null
    token = '';
    const res = await sendRequest();
    expect(res.status).toBe(401);
  });
  it('should return 400 if token is invalid', async () => {
    token = 'wrongtoken';
    const res = await sendRequest();
    expect(res.status).toBe(400);
  });
  it('should return 400 if token is invalid', async () => {
    const user = new User({
      name: 'Test User',
      email: 'test@gmail.com',
      password: 'testPassword',
    });
    await user.save();
    token = user.generateAuthToken();
    const res = await sendRequest();
    expect(res.status).toBe(404);
  });
});
