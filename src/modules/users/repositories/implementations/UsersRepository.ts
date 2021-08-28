import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    const userWithGames = await this.repository.findOne(user_id, {
      relations: ["games"],
    }) as User

    return userWithGames;  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
     const allUsersAsc = await this.repository.find({
       order: {
         first_name: 'ASC'
       }
     })
    return allUsersAsc;

    // return this.repository.query(); // Complete usando raw query
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    throw new Error('Method not implemented.');

    // return this.repository.query(); // Complete usando raw query
  }
}
