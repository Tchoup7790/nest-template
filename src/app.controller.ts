import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'

@Controller()
@ApiTags('Ping')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/ping')
  @ApiOperation({ summary: 'Ping endpoint', description: 'Returns pong' })
  @ApiOkResponse({
    type: String,
  })
  getPong(): string {
    return this.appService.getPong()
  }
}
