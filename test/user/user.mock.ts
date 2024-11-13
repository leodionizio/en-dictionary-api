import { UserWordsAddedResponseDto } from 'src/user/dto/user-words-added.dto';
import { User } from '../../src/user/user.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { HistoryWithDictionaryDto } from '../../src/history/dto/history.dto';
import { FavoriteWithDictionaryDto } from '../../src/favorite/dto/favorite.dto';

export type UserMock = {
  createUser: CreateUserDto;
  user: User;
  history: UserWordsAddedResponseDto;
  historyDictionary: HistoryWithDictionaryDto[];
  favorites: UserWordsAddedResponseDto;
  favoritesDictionary: FavoriteWithDictionaryDto[];
};

export const userMock: UserMock = {
  createUser: {
    name: 'Ciclano Fulano',
    email: 'ciclano@gmail.com',
    password: '67asd78',
  },
  user: {
    id: '1',
    name: 'Ciclano Fulano',
    email: 'ciclano@gmail.com',
    password: '67asd78',
    createdAt: new Date('2024-11-13T16:06:46.616Z'),
  },
  historyDictionary: [
    {
      id: '12',
      createdAt: new Date('2024-11-13T16:06:46.616Z'),
      dictionary: {
        id: '32',
        word: 'test',
        createdAt: new Date('2024-11-13T16:06:46.616Z'),
      },
    },
    {
      id: '5',
      createdAt: new Date('2024-11-13T16:06:46.616Z'),
      dictionary: {
        id: '32',
        word: 'count',
        createdAt: new Date('2024-11-13T16:06:46.616Z'),
      },
    },
  ],
  history: {
    results: [
      {
        word: 'test',
        added: new Date('2024-11-13T16:06:46.616Z'),
      },
      {
        word: 'count',
        added: new Date('2024-11-13T16:06:46.616Z'),
      },
    ],
  },
  favorites: {
    results: [
      {
        word: 'fast',
        added: new Date('2024-11-13T14:51:20.607Z'),
      },
    ],
  },
  favoritesDictionary: [
    {
      id: '67',
      createdAt: new Date('2024-11-13T14:51:20.607Z'),
      dictionary: {
        id: '98',
        word: 'fast',
        createdAt: new Date('2024-11-13T14:51:20.607Z'),
      },
    },
  ],
};
