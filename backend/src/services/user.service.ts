import {UserService} from '@loopback/authentication';
import {repository} from '@loopback/repository';
import {HttpErrors} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import {compare} from 'bcryptjs';
// User --> MyUser

// UserRepository --> MyUserRepository
import {UserRepository} from '../repositories';
import { User } from '@loopback/authentication-jwt';

export type Credentials = {
  email: string;
  username: string;
  password: string;
};

// User --> MyUser
export class CustomUserService implements UserService<User, Credentials> {
  constructor(
    // UserRepository --> MyUserRepository
    @repository(UserRepository) public userRepository: UserRepository,
  ) {}

  // User --> MyUser
  async verifyCredentials(credentials: Credentials): Promise<User> {
    const invalidCredentialsError = 'Invalid email or password.';

    console.log(credentials);
    
    const foundUser = await this.userRepository.findOne({
      where: {username: credentials.username},
    });

    console.log(credentials.password, foundUser?.password);
    
    if (!foundUser) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }
    const passwordMatched = await compare(
      credentials.password,
      foundUser.password,
    );
    
    if (!passwordMatched) {
      throw new HttpErrors.Unauthorized(invalidCredentialsError);
    }

    return new User(foundUser) ;
  }

  // User --> MyUser
  convertToUserProfile(user: User): UserProfile {
    return {
      [securityId]: user.uid!.toString(),
      name: user.username,
      id: user.uid,
    };
  }
}