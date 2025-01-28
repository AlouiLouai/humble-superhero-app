import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SuperheroesModule } from '../superheroes/superheroes.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    SuperheroesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
