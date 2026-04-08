import { BadRequestException } from "../common/index.js";

export const validate = (schema) => {
  return (req, res, next) => {
    const validationResult = schema.validate(req.body, { abortEarly: false });

    if (validationResult.error) {
      const errors = validationResult.error.details.map(
        (detail) => detail.message,
      );
      throw new BadRequestException("validation Error", errors);
    }
    console.log(validationResult);
    next();
  };
};
