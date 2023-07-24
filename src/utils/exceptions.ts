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
  error: string;
  status: number;

  constructor(error: string, status: number) {
    this.error = error;
    this.status = status;
  }
}

/**
 * Création d'une 404
 */
export class NotFoundException extends Exception {
  /**
   * On appelle le `constructor` de la classe parente `Exception`
   */
  constructor(error: string) {
    super(error, 404);
  }
}

/**
 * Création d'une 400
 */
export class BadRequestException extends Exception {
  /**
   * On appelle le `constructor` de la classe parente `Exception`
   */
  constructor(error: string) {
    super(error, 400);
  }
}

/**
 * Création d'une 409
 */
export class ConflictException extends Exception {
  /**
   * On appelle le `constructor` de la classe parente `Exception`
   */
  constructor(error: string) {
    super(error, 409);
  }
}
