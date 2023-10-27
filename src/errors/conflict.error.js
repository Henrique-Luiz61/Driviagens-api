export function conflictError(resource) {
  let message = "";

  if (resource === "ids") {
    message = "Origin and destination must be different!";
  }

  if (resource === "Passenger" || resource === "City") {
    message = `${resource} already exists!`;
  }

  return {
    type: "conflict",
    message,
  };
}
