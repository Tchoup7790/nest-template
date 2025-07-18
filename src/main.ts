import { ConsoleLogger, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import chalk from 'chalk'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({ prefix: 'alyssa-illustration' }),
  })

  app.setGlobalPrefix('/api/v1')

  app.enableCors()

  // config swagger
  const config = new DocumentBuilder()
    .setTitle('alyssa-illustration-rest-api')
    .setDescription('Rest API designed for Alyssa-Illustration, an online store specializing in unique and creative illustrations.')
    .setVersion('1.0')
    .build()

  const documentFactory = () => SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api/v1/docs', app, documentFactory)

  // start and add good color
  await app.listen(process.env.PORT ?? 4000).then(() => {
    Logger.log(`Server started: ${chalk.gray(`${app.get(ConfigService).get('HOST')}:${app.get(ConfigService).get('PORT')}`)}`)
    Logger.log(`Env: ${chalk.gray(app.get(ConfigService).get('ENV'))}`)
  })
}
bootstrap()
