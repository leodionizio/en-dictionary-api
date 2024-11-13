import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { DictionaryService } from '../src/dictionary/dictionary.service';
import fetch from 'node-fetch';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const dictionaryService = app.get(DictionaryService);

  try {
    console.log('Downloading word list...');

    const response = await fetch(
      'https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json',
    );
    const words = await response.json();

    console.log('Inserting words into the database...');

    const wordEntries = Object.keys(words);
    await dictionaryService.bulkInsert(wordEntries);

    console.log('Words entered successfully');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await app.close();
  }
}

bootstrap();
