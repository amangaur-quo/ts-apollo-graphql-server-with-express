import { Schema, model } from 'mongoose';
import { IUser } from '../interfaces';

const userSchema = new Schema<IUser>(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		deletedAt: {
			type: Date,
			default: null,
		},
	},
	{ timestamps: true },
);

userSchema.pre('find', function () {
	this.where({ deletedAt: null });
});

userSchema.pre('findOne', function () {
	this.where({ deletedAt: null });
});

export const User = model<IUser>('users', userSchema);
