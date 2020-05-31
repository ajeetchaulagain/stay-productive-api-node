import jwt from 'jsonwebtoken';
import config from 'config';
import mongoose from 'mongoose';
import { User } from '../../../models/user';

describe('user.generateAuthToken', () => {
  it('should return a valid JWT', () => {
    const payload = { _id: new mongoose.Types.ObjectId().toHexString() };
    const user = new User(payload);
    const token = user.generateAuthToken();
    const decodedPayload = jwt.verify(token, config.get('jwtPrivateKey'));
    expect(decodedPayload).toMatchObject(payload);
  });
});
