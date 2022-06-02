const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const db = require("./models");
const corsOptions = {
    origin: "http://localhost:8081"
};
const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cookieSession({
        name: "Users",
        secret: "secret",
        httpOnly: true
    })
);

const dbConfig = {
    HOST: "0.0.0.0",
    PORT: 27017,
    DB: "Users"
};

db.mongoose
    .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
        initial();
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });


app.get("/", (req, res) => {
    res.json({ message: "Welcome." });
});
require("./routes/userRoutes")(app);
require("./routes/authRoutes")(app);


// Routes

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});



function initial() {

}
