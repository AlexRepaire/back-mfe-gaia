import { NotFoundException } from "../utils/exceptions";

/**
 * Pour toutes les autres routes non définies, on retourne une erreur
 */
const UnknownRoutesHandler = () => {
  throw new NotFoundException(`La resource demandée n'existe pas`);
};

export default UnknownRoutesHandler;
