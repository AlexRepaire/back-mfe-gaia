"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestException = exports.NotFoundException = void 0;
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
class Exception {
    constructor(error, status) {
        this.error = error;
        this.status = status;
    }
}
/**
 * Création d'une 404
 */
class NotFoundException extends Exception {
    /**
     * On appelle le `constructor` de la classe parente `Exception`
     */
    constructor(error) {
        super(error, 404);
    }
}
exports.NotFoundException = NotFoundException;
/**
 * Création d'une 400
 */
class BadRequestException extends Exception {
    /**
     * On appelle le `constructor` de la classe parente `Exception`
     */
    constructor(error) {
        super(error, 400);
    }
}
exports.BadRequestException = BadRequestException;
