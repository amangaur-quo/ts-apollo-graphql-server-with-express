import { Request } from 'express';
import { IUser } from '../../user/interfaces';

export interface IRequestWithAuthInfo extends Request {
  isAuth: boolean;
  authUser: IUser;
}
