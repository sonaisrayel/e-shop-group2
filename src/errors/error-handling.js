export const notFoundError = (res, message) => {
    res.status(404).send(message);
}

export const validationError = (res, message) => {
    res.status(403).send(message)
}