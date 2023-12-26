export interface UserResponse {
  id: string;
  email: string;
  userName: string;
  // favouritePosts: string[];
  // avatar: string;
  // userDescription: string;
  dateOfJoining: Date;
  isStaff: boolean;
  isAdmin: boolean;
  isActive: boolean;
}
