import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { DictionaryService } from './dictionary.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('entries/en')
@UseGuards(AuthGuard)
export class DictionaryController {
  constructor(private readonly dictionaryService: DictionaryService) {}

  @Get()
  async getAllWords(
    @Query('limit') limit = 10,
    @Query('cursor') cursor?: string,
    @Query('direction') direction: 'next' | 'previous' = 'next',
  ) {
    return await this.dictionaryService.findAll({
      limit: Number(limit),
      cursor,
      direction,
    });
  }

  @Get(':word')
  async getWord(@Param('word') word: string, @Req() req) {
    return await this.dictionaryService.findOne(word, req.user.sub);
  }

  @Post(':word/favorite')
  async addWordToFavorites(@Param('word') word: string, @Req() req) {
    return await this.dictionaryService.addWordToUserFavorites(
      word,
      req.user.sub,
    );
  }

  @Delete(':word/unfavorite')
  async removeWordFromFavorites(@Param('word') word: string, @Req() req) {
    return await this.dictionaryService.removeWordFromUserFavorites(
      word,
      req.user.sub,
    );
  }
}
