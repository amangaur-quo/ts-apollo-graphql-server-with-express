import { Types } from 'mongoose';

export interface IPost {
	title: string;
	content: string;
	featuredImgae: string;
	author: Types.ObjectId;
	deletedAt: Date;
}
