import { sign } from 'jsonwebtoken';
import { SECRET } from '../../config';
import { IUser } from 'src/modules/user/interfaces';

export const issueToken = async (user: IUser) => {
	let token = sign(user, SECRET, { expiresIn: 60 * 60 * 24 });
	return `Bearer ${token}`;
};
