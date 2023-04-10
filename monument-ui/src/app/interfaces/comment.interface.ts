import { UserResponse } from "./user.interface"

export interface CommentResponse {
    id: string
    content: string;
    author: UserResponse;
}