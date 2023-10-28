import httpStatus from "http-status";

export default function errorsMiddleware(err, req, res, next) {
  if (err.type === "notFound")
    return res.status(httpStatus.NOT_FOUND).send(err.message);

  if (err.type === "unprocessableEntity")
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(err.message);

  if (err.type === "conflict")
    return res.status(httpStatus.CONFLICT).send(err.message);

  res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ message: "erro", err });
}
