const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const crypto = require('crypto')
const routes = require('./routes/routes.js')
const connection = require('./config./database.js')

const MongoStore = require('connect-mongo')

// General setup

require('dotenv').config()

// Create the express application
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))