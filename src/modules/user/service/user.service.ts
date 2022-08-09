import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User2000 } from 'src/constants/api-code/user2000';
import { ApiException } from 'src/exception/api.exception';
import { Crypto } from 'src/library/crypto';
import { User } from 'src/models/user';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll() {
    return this.usersRepository.find();
  }

  findOneByUid(uid) {
    return this.usersRepository.findOneBy({ uid });
  }

  findOneBy(finder) {
    return this.usersRepository.findOneBy(finder);
  }

  getUsersByQuery() {
    return User.createQueryBuilder()
      .where('uid = :uid', { uid: 'lu7766' })
      .getMany();
  }

  getUsersPosts() {
    return this.usersRepository.find({
      where: { uid: 'lu7766' },
      relations: {
        posts: true,
      },
    });
  }

  async createUser({
    uid,
    email,
    password,
    name,
  }: {
    uid: string;
    email: string;
    password: string;
    name: string;
  }) {
    // const count = await this.usersRepository.countBy({ uid });
    // if (count) {
    //   throw new ApiException(User2000.USER_EXISTS);
    // }
    return this.usersRepository
      .merge(new User(), {
        uid,
        email,
        password: await Crypto.hash(password),
        name,
      })
      .save();
  }
}
