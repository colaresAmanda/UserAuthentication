require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const session = require("express-session")

// Pakacge focumentation - https://www.npmjs.com/package/connect-mongo
const MongoStore = require("connect-mongo")

// Create the Express application
const app = express()

const dbString = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.ofb7mor.mongodb.net/?retryWrites=true&w=majority`
const dbOptions = {
    useUnifiedTopology: true,
}

mongoose.createConnection(dbString, dbOptions)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const sessionStore = MongoStore.create({
    mongoUrl: dbString,
    collection: "sessions",
})

app.use(
    session({
        secret: "some secret",
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: dbString,
            collection: "sessions",
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24, // Equals 1 day (1 day * 24hr/1day  * 60min/1hora )
        },
    })
)

app.get("/", (req, res, next) => {
    if (req.session.viewCount)
        req.session.viewCount++
    else
        req.session.viewCount = 1

    res.send(
        `<h1>Hello World! (Session)</h1>
        <h2>You have visited this page ${req.session.viewCount} time/s</h2>`
    )
})

app.listen(3000)
