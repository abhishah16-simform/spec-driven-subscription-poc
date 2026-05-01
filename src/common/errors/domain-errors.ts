import {
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';

export function notFound(entity: string, id: string): never {
  throw new NotFoundException(`${entity} with id '${id}' not found`);
}

export function conflict(message: string): never {
  throw new ConflictException(message);
}

export function forbidden(message: string): never {
  throw new ForbiddenException(message);
}
