import { Injectable } from '@nestjs/common';
import { AuthGuard as Guard } from '@nestjs/passport';

@Injectable()
export class AuthWithUserGuard extends Guard('auth-with-user') {}
