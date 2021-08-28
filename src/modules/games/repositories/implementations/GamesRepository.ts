import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    const result = this.repository
    .createQueryBuilder('games')
    .where("games.title ILIKE :param", {param: `%${param}%`})
    .getMany();
    return result;
  }

  async countAllGames(): Promise<[{ count: string }]> {
    throw new Error('Method not implemented.');

    // return this.repository.query(); // Complete usando raw query
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    throw new Error('Method not implemented.');

    // return this.repository
    //   .createQueryBuilder()
    //   // Complete usando query builder
  }
}
