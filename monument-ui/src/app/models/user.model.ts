export class User {
    id: string = '';
    nickname: string = '';
    dateOfJoin: Date | undefined;
    favouritePosts: string[] = [];
    avatar: string = '';
    userDescription: string = '';
}