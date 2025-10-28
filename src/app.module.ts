import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { DatabaseConfigModule } from './config/db.config';

@Module({
  imports: [DatabaseConfigModule, TasksModule], // por lo general solo se importan modulos de un modulo general (index)
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
