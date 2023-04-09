import { User } from "./user.interface"

export interface Post {
    id: string
    content: string;
    author: User;
}