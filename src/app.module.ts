import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './app/todo/todo.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mariadb',
        host: configService.get('DATABASE_HOST', 'localhost'),
        port: Number(configService.get('DATABASE_PORT', 3306)),
        username: configService.get('DATABASE_USER', 'root'),
        password: configService.get('DATABASE_PASSWORD', '123'),
        database: configService.get('DATABASE_TABLE', 'todo'),
        entities: [__dirname + '/**/*.entity{.js,.ts}'],
        synchronize: true,
        // synchronize: true -> shouldn't be used in production
      }),
    }),
    TodoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
