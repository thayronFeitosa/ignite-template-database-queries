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
    const result = await this.repository
    .createQueryBuilder('games')
    .where("games.title ILIKE :param", {param: `%${param}%`})
    .getMany();
    return result;
  }

  async countAllGames(): Promise<[{ count: string }]> {
    const countAllGames = await this.repository.query('SELECT COUNT(*) FROM games');
    return countAllGames;
  }

  async findUsersByGameId(id: string): Promise<User[]> {

    const relarions =  await this.repository
    .createQueryBuilder()
    .relation("users")
    .of(id)
    .loadMany();
    return relarions;
  }
}
