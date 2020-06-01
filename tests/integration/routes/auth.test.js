import request from 'supertest';
import bcrypt from 'bcrypt';
import app from '../../../testEnvServer';
import { User } from '../../../models/user';

describe('/api/auth', () => {
  afterEach(async () => {
    await User.remove();
  });

  describe('POST /', () => {
    let name;
    let email;
    let password;

    const setValidUserAuthenticationInput = () => {
      email = 'test@gmail.com';
      password = 'testPassword';
    };

    beforeEach(() => {
      setValidUserAuthenticationInput();
    });
    // eslint-disable-next-line arrow-body-style
    const sendRequest = () => {
      return request(app).post('/api/auth').send({ email, password });
    };

    const saveUserToDB = async () => {
      name = 'Test User';
      const user = new User({
        name,
        email,
        password,
      });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      await user.save();
    };

    it('should return 400 if email is not is valid format', async () => {
      email = 'invalidemail';
      const res = await sendRequest();
      expect(res.status).toBe(400);
    });

    it('should return 400 if password input is not in valid format', async () => {
      password = '12';
      const res = await sendRequest();
      expect(res.status).toBe(400);
    });

    it('should return 400 if user is not registered', async () => {
      const res = await sendRequest();
      expect(res.status).toBe(400);
    });

    it('should return 400 if password for the user in db is not valid', async () => {
      saveUserToDB();
      // changing password
      password = 'wrongPassword';
      const res = await sendRequest();
      expect(res.status).toBe(400);
    });
    it('should send auth token if login is valid', async () => {
      // changing password
      saveUserToDB();
      const res = await sendRequest();
      expect(res.header['x-auth-token']).not.toBeNull();
    });
  });
});
