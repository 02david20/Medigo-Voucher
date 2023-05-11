// ---------- ADD IMPORTS -------------
import {inject} from '@loopback/core';
import {
  TokenServiceBindings,
  MyUserService,
  UserServiceBindings,
  UserRepository,
  Credentials,
} from '@loopback/authentication-jwt';
import {TokenService, authenticate} from '@loopback/authentication';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import {repository} from '@loopback/repository';
import { prependOnceListener } from 'process';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import { request } from 'http';
import { User } from '../models';
import { genSalt, hash } from 'bcryptjs';
import _ from 'lodash';
import { log } from 'console';
// ----------------------------------

export class UserController {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: TokenService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: MyUserService,
    @inject(SecurityBindings.USER, {optional: true})
    public user: UserProfile,
    @repository(UserRepository) protected userRepository: UserRepository,
  ) {}

  @post('/signup')
  async signup(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUser',
            exclude:['uid']
          }),
        },
      },
    })
    user : Omit<User, 'uid'>
  ) {
    const password = await hash(user.password, await genSalt());
    const savedUser = await this.userRepository.create(
      {password,..._.omit(user, 'password')}
    );
    return savedUser;
  }

  @post('/users/login')
  async login(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUser',
            exclude:['uid']
          }),
        },
      },
    })
    credentials: Credentials
  )  {
    // ensure the user exists, and the password is correct
    const user = await this.userService.verifyCredentials(credentials);
    // convert a User object into a UserProfile object (reduced set of properties)
    const userProfile = this.userService.convertToUserProfile(user);
    // create a JSON Web Token based on the user profile
    const token = await this.jwtService.generateToken(userProfile);
    return {token};
  }
  
  @authenticate('jwt')
  @get('/whoami') 
  async whoAmI(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<string> {
    return currentUserProfile[securityId];
  }
}
