import { Injectable } from '@nestjs/common';

class GetAppNameDto {
  message: string;
}

@Injectable()
export class AppService {
  getAppName(): GetAppNameDto {
    return { message: 'English Dictionary' };
  }
}
