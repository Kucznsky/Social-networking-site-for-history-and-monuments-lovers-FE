import { Category } from '../enums/post-category.enum';
import { PostResponse } from '../interfaces/post.interface';
import { CommentMock } from './comment.mock';
import { LocalisationMock } from './localisation.mock';
import { UserMock } from './user.mock';

export const PostMock: PostResponse[] = [
  {
    id: 'swrqwfsdfw213e124e',
    title: 'Lubomirski Palace',
    category: Category.PalacesAndVillas,
    likes: 10,
    isLiked: false,
    userComments: [CommentMock],
    author: UserMock,
    location: LocalisationMock,
    thumbnail:
      'https://www.radio.bialystok.pl/src/383/feb64d640ad05b0c6f11726bb7c7fe9c',
    modernImages: [],
    archivalImages: [],
    description: 'Ok',
  },
];
