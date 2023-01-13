import { OmitType } from '@nestjs/swagger';
import { TodoEntity } from '../todo/entities/todo.entity';

export class CreateTodoSwagger extends OmitType(TodoEntity, [
  'deleteAt',
  'updatedAt',
]) {}
