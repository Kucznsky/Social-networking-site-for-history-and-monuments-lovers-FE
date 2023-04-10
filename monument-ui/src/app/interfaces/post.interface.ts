import { Category } from "../enums/post-category.enum"
import { User } from "./user.interface"

export interface Post {
    id: string;
    title: string;
    category: Category;
    likes: number;
    isLiked: boolean;
    comments: Comment[];
    author: User;
    location: Location;
    thumbnail: string;
    modernImages: string[];
    archivalImages: string[];
    description: string;
}