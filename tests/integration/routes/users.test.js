import request from 'supertest';
import app from '../../../testEnvServer';
import { User } from '../../../models/user';

describe('/api/users', () => {
  beforeEach(() => {});
  afterEach(async () => {
    await User.remove();
  });

  describe('POST /', () => {
    let name;
    let email;
    let password;

    const setValidUserRegistrationInput = () => {
      name = 'Test User';
      email = 'test@gmail.com';
      password = 'testPassword';
    };

    beforeEach(() => {
      setValidUserRegistrationInput();
    });
    // Valid user input. It will be changed in test as required

    // common execution function
    // eslint-disable-next-line arrow-body-style
    const sendRequest = () => {
      return request(app).post('/api/users').send({ name, email, password });
    };

    it('should return 400 if user name is more than 55 characters', async () => {
      // Creating name with >55 character
      name = new Array(57).join('a');
      const res = await sendRequest();
      expect(res.status).toBe(400);
    });

    it('should return 400 if email is not in valid format', async () => {
      email = 'invalidemail';
      const res = await sendRequest();
      expect(res.status).toBe(400);
    });

    it('should return 400 if password is less than 5 character', async () => {
      password = 'test';
      const res = await sendRequest();
      expect(res.status).toBe(400);
    });

    it('should return 400 if email already exist', async () => {
      const req = {
        name: 'Ajeet',
        email: 'testemail@gmail.com',
        password: 'testPassword',
      };

      let user = new User(req);
      user = await user.save();
      expect(user).not.toBeNull();

      const res = await request(app).post('/api/users').send(req);
      expect(res.status).toBe(400);
    });

    it('should save the user if it doesnt exist already', async () => {
      await sendRequest();
      const user = await User.findOne({ email: 'test@gmail.com' });
      expect(user).not.toBeNull();
    });

    it('should return the user object as response if it is valid', async () => {
      const res = await sendRequest();
      expect(res.body).toHaveProperty('_id');
      expect(res.body).toHaveProperty('name');
      expect(res.body).toHaveProperty('email');
      expect(res.status).toBe(200);
    });

    it('should return the auth token in response header when user is registered', async () => {
      const res = await sendRequest();
      expect(res.header['x-auth-token']).not.toBeNull();
    });
  });

  describe('DELETE /delete', () => {
    it('should return 401 if user is not logged in', async () => {
      const token = '';

      const res = await request(app)
        .delete('/api/users/delete')
        .set('x-auth-token', token);

      expect(res.status).toBe(401);
    });

    it('should return 400 if user is not found', async () => {
      const token = new User().generateAuthToken();
      const res = await request(app)
        .delete('/api/users/delete')
        .set('x-auth-token', token);

      expect(res.status).toBe(400);
    });

    it('should return the deleted user if it is found', async () => {
      const token = new User().generateAuthToken();
      const res = await request(app)
        .delete('/api/users/delete')
        .set('x-auth-token', token);

      expect(res.status).toBe(400);
    });
  });
});
