import { UserResponse } from '../interfaces';

export class User {
  id: string = '';
  userName: string = '';
  email: string;
  dateOfJoining: Date;
  avatar?: string = '';
  isActive: boolean;
  isStaff: boolean;
  isAdmin: boolean;

  constructor(userResponseData?: UserResponse) {
    Object.assign(this, userResponseData);
  }
}
