import { ValidationError } from "express-validator";

export interface ApiException {
  error: string | string[] | ValidationError[];
  status: number;
}