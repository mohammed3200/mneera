// main/errors/UniqueConstraintError.ts
export class UniqueConstraintError extends Error {
  code: string;

  constructor(message: string, code: string) {
    super(message);
    this.name = "UniqueConstraintError";
    this.code = code;
  }
}
