import { ValidationError } from "express-validator";
import { ApiException } from "../types/exceptions";

/**
 * Classe générique qui sert à créer des erreurs HTTP (ici 400 et 404)
 *
 * On précise que notre classe doit correspondre à l'interface `ApiException`
 *
 * Les mots clés `readonly` servent de raccourci pour `this.propriété = valeur`,
 * ils nous empêchent également de mofifier ces valeurs par la suite.
 *
 * Ici `this.error = error` et `this.status = status`
 */
class Exception implements ApiException {
  error: string | string[] | ValidationError[];
  status: number;

  constructor(error: string | string[] | ValidationError[], status: number) {
    this.error = error;
    this.status = status;
  }
}

export class NotFoundException extends Exception {
  constructor(error: string) {
    super(error, 404);
  }
}

export class BadRequestException extends Exception {
  constructor(error: string) {
    super(error, 400);
  }
}

export class ConflictException extends Exception {
  constructor(error: string) {
    super(error, 409);
  }
}

export class ErrorSchemaEntityException extends Exception {
  constructor(error: string | ValidationError[]) {
    super(error, 422);
  }
}

export class UnauthorizedException extends Exception {
  constructor(error: string) {
    super(error, 401);
  }
}

export class ForbiddenException extends Exception {
  constructor(error: string) {
    super(error, 403);
  }
}

export class InternalServerErrorException extends Exception {
  constructor(error: string) {
    super(error, 500);
  }
}
