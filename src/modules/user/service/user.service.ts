import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Crypto } from 'src/library/crypto';
import { User } from 'src/models/user';
import { RequestService } from 'src/modules/common/service/request.service';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private requestService: RequestService,
  ) {}

  list({ keyword, ...body }) {
    console.log(keyword);
    const [offset, perPage] = this.requestService.getPaginate(body);
    return this.whereBuilder({ keyword })
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('role.permissions', 'permissions')
      .offset(offset)
      .limit(perPage)
      .getMany();
  }

  total({ keyword }) {
    return this.whereBuilder({ keyword }).getCount();
  }

  whereBuilder(body) {
    const { keyword } = body;
    const query = this.usersRepository.createQueryBuilder('user');

    if (keyword) {
      query.where('email like :keyword', { keyword: `%${keyword}%` });
    }
    return query;
  }

  async create({
    email,
    password,
    role_id,
  }: {
    email: string;
    password: string;
    role_id: number;
  }) {
    return this.usersRepository
      .merge(new User(), {
        email,
        password: await Crypto.hash(password),
        role_id,
      })
      .save();
  }

  async update({
    id,
    email,
    password,
    role_id,
  }: {
    id: number;
    email: string;
    password: string;
    role_id: number;
  }) {
    const user = await this.usersRepository.findOneByOrFail({ id });
    return this.usersRepository
      .merge(user, {
        email,
        password: password ? await Crypto.hash(password) : undefined,
        role_id,
      })
      .save();
  }
}
