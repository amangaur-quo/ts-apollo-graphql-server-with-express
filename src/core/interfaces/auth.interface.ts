import { Request } from 'express';
import { IUser } from '../../modules/user/interfaces';

export interface IRequestWithAuthInfo extends Request {
	isAuth: boolean;
	authUser: IUser;
}
