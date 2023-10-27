export function unprocessableError(resource) {
  let message = "";

  if (resource === "date") {
    message = "Date must be a future date!";
  }

  return {
    type: "unprocessableEntity",
    message,
  };
}
