import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { DatabaseConfigModule } from './database/db.config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DatabaseConfigModule, TasksModule, UsersModule, AuthModule], // por lo general solo se importan modulos de un modulo general (index)
})
export class AppModule {}
