import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import * as cookieparser from 'cookie-parser';
import { AppModule } from './app.module';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: ['http://localhost:4200', 'http://localhost:3000'],
      credentials: true,
    },
  });

  app.use(compression());
  app.use(cookieparser());

  await app.listen(process.env.PORT || 3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
