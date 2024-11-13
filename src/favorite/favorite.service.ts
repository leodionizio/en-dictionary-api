import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dictionary } from '../dictionary/dictionary.entity';
import { User } from '../user/user.entity';
import { Favorite } from './favorite.entity';
import { FavoriteWithDictionaryDto } from './dto/favorite.dto';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
  ) {}

  async findFavoritesByUserId(
    userId: string,
  ): Promise<FavoriteWithDictionaryDto[]> {
    return await this.favoriteRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
      relations: ['dictionary'],
    });
  }

  async findFavoriteByDictionaryAndUser(
    dictionary: Dictionary,
    user: User,
  ): Promise<Favorite> {
    return await this.favoriteRepository.findOne({
      where: {
        dictionary: { id: dictionary.id },
        user: { id: user.id },
      },
    });
  }

  async addWordToUserFavorites(dictionary: Dictionary, user: User) {
    const favorite = await this.findFavoriteByDictionaryAndUser(
      dictionary,
      user,
    );
    if (favorite) {
      throw new ConflictException(
        `Word ${dictionary.word} already in favorites.`,
      );
    }

    const newFavorite = this.favoriteRepository.create({ dictionary, user });
    await this.favoriteRepository.save(newFavorite);
  }

  async removeWordFromUserFavorites(dictionary: Dictionary, user: User) {
    const favorite = await this.findFavoriteByDictionaryAndUser(
      dictionary,
      user,
    );

    if (!favorite) {
      throw new NotFoundException(
        `Word ${dictionary.word} not found in favorites.`,
      );
    }

    await this.favoriteRepository.remove(favorite);
  }
}
