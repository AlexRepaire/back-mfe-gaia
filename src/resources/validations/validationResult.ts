import { Request } from "express";
import { validationResult } from "express-validator";
import { ErrorSchemaEntityException } from "~/utils/exceptions";

const validationResultHandler = (req: Request) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    //throw new ErrorSchemaEntityException(errors.array());
    throw new ErrorSchemaEntityException(errors.array().at(0)?.msg);
  }
};

export default validationResultHandler;
