import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTodoSwagger } from '../swagger/create-todo-swagger';
import { BadRequestSwagger } from '../swagger/helpers/bad-request-swagger';
import { NotFoundSwagger } from '../swagger/helpers/not-found-swagger';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoService } from './todo.service';

@Controller('api/todos')
@ApiTags('ToDos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get(':id')
  @ApiOperation({ summary: 'List one task' })
  @ApiResponse({ status: 200, description: 'Task data returned successfully' })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
    type: NotFoundSwagger,
  })
  async find(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.todoService.findOne(id);
  }

  @Get()
  @ApiOperation({ summary: 'List all tasks' })
  @ApiResponse({
    status: 200,
    description: 'Task data returned successfully',
    type: CreateTodoSwagger,
    isArray: true,
  })
  async list() {
    return await this.todoService.findAll();
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'new task created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'invalid data parameters',
    type: BadRequestSwagger,
  })
  @ApiOperation({ summary: 'Create a task' })
  async create(@Body() body: CreateTodoDto) {
    return await this.todoService.create(body);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a task' })
  @ApiResponse({
    status: 400,
    description: 'invalid data parameters',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
    type: NotFoundSwagger,
  })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateTodoDto,
  ) {
    return await this.todoService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a task' })
  @ApiResponse({ status: 204, description: 'Task removed sucessfully' })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
    type: NotFoundSwagger,
  })
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.todoService.delete(id);
  }
}
