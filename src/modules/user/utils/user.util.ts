import { pick } from 'lodash';
import { IUser } from '../interfaces';

export const serializeUser = (user: IUser) => {
	return pick(user, ['id', 'email', 'name']);
};

export const validateEmail = email => {
	let emailRegex =
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return emailRegex.test(email);
};
