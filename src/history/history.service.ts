import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dictionary } from '../dictionary/dictionary.entity';
import { User } from '../user/user.entity';
import { History } from './history.entity';
import { HistoryWithDictionaryDto } from './dto/history.dto';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History)
    private readonly historyRepository: Repository<History>,
  ) {}

  async findHistoryByUserId(
    userId: string,
  ): Promise<HistoryWithDictionaryDto[]> {
    return await this.historyRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
      relations: ['dictionary'],
    });
  }

  async addWordToUserHistory(
    dictionary: Dictionary,
    user: User,
  ): Promise<History> {
    const history = this.historyRepository.create({ dictionary, user });
    return await this.historyRepository.save(history);
  }
}
