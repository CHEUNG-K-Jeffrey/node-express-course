const notFound = (req, res) => res.status(404).send("Route des not exist");

module.exports = notFound;
