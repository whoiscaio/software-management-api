import { Request } from 'express';
import { User } from 'src/modules/auth/models/user.model';

export interface CustomRequest extends Request {
  user?: User;
}
