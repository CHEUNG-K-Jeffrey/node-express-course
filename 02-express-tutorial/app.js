const { products } = require("./data");
const express = require("express");
console.log('Express Tutorial');

const app = express();

app.use(express.static("./public"));

app.get("/api/v1/products/:productID", (req, res) => {
    const product = products.find((p) => p.id === parseInt(req.params.productID));
    res.status(product ? 200 : 404).json(product ?? { message: "That product was not found." });
});

app.get("/api/v1/products/", (req, res) => {
    res.json(products);
});

app.get("/api/v1/query", (req, res) => {
    const response = products.filter((product) => {
        if (product.name.startsWith(req.query.search)) {
            return true;
        }
    }).slice(0, req.query.limit);
    res.json(response);
});

app.get("/api/v1/test", (req, res) => {
    res.json({ message: "It worked!" });
});

app.listen(3000, () => console.log("Listening on port 3000"));