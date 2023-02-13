require("dotenv").config();
const app = require("./app");
const connectWithDb = require("./config/db");

// to connect with database
connectWithDb();

app.listen(process.env.PORT, () => {
  console.log(`App is running at ${process.env.PORT}`);
});
