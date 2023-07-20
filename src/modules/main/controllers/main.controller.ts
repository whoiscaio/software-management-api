import { Controller, Get } from '@nestjs/common';

@Controller()
export class MainController {
  @Get('ping')
  ping() {
    return {
      message: 'Working!',
    };
  }
}
