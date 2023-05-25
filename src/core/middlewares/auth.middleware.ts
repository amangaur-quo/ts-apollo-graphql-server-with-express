import { SECRET } from '../../config';
import { verify } from 'jsonwebtoken';
import { User } from '../../modules/user/models';

export const authMiddleware = async (req, res, next) => {
	const authHeaders = req.get('Authorization');
	if (!authHeaders) {
		req.isAuth = false;
		return next();
	}
	let token = authHeaders.split(' ')[1];
	if (!token || token === '') {
		req.isAuth = false;
		return next();
	}

	let decodedToken;
	try {
		decodedToken = verify(token, SECRET);
	} catch (error) {
		req.isAuth = false;
		return next();
	}

	if (!decodedToken) {
		req.isAuth = false;
		return next();
	}

	// Find the user from the database
	let authUser = await User.findById(decodedToken.id).select('-password');
	if (!authUser) {
		req.isAuth = false;
		return next();
	}

	req.authUser = authUser;
	req.isAuth = true;
	return next();
};
