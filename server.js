require("dotenv").config();
const app = require("./app/app");

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server listen on port ${port}`);
});