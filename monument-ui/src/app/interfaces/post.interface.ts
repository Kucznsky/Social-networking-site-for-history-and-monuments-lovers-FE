import { Category } from "../enums/post-category.enum"
import { LocalisationResponse } from "./localisation.interface";
import { UserResponse } from "./user.interface"

export interface PostResponse {
    id: string;
    title: string;
    category: Category;
    likes: number;
    isLiked: boolean;
    comments: Comment[];
    author: UserResponse;
    location: LocalisationResponse;
    thumbnail: string;
    modernImages: string[];
    archivalImages: string[];
    description: string;
}