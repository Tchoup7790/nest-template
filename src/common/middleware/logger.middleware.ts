import { Request, Response, NextFunction } from 'express'
import { Logger } from '@nestjs/common'
import chalk from 'chalk'

export function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
  const logger = new Logger('HTTP')
  const { method, originalUrl, body: reqBody } = req

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const chunks: any[] = []
  const originalWrite = res.write.bind(res)
  const originalEnd = res.end.bind(res)
  const start = Date.now()

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  res.write = (...args: any[]) => {
    chunks.push(Buffer.from(args[0]))
    return originalWrite(...args)
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  res.end = (...args: any[]) => {
    if (args[0]) {
      chunks.push(Buffer.from(args[0]))
    }

    const duration = Date.now() - start
    const responseBody = Buffer.concat(chunks).toString('utf8')
    const { statusCode } = res

    // Select color based on HTTP status code
    const statusColor = statusCode >= 500 ? chalk.bgRed : statusCode >= 400 ? chalk.bgYellow : statusCode >= 300 ? chalk.bgCyan : chalk.bgGreenBright

    let logMessage = `${chalk.gray(method)} ${originalUrl} ` + `${statusColor(` ${chalk.black(statusCode.toString())} `)}` + `${chalk.green(` - ${duration}ms`)}`

    if (reqBody) {
      logMessage += `\n${chalk.green('→ REQ:')} ${chalk.gray(JSON.stringify(reqBody, null, 2))}`
    }
    if (responseBody && responseBody !== undefined) {
      try {
        logMessage += `\n${chalk.green('← RES:')} ${chalk.gray(JSON.stringify(JSON.parse(responseBody), null, 2))} `
      } catch {
        logMessage += `\n${chalk.green('← RES:')} ${chalk.gray(JSON.stringify(responseBody, null, 2))} `
      }
    }

    logger.log(logMessage)
    return originalEnd(...args)
  }

  next()
}
