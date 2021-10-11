import { config } from "dotenv"
import app from "./app"
import createClass from "./endpoints/createClass"

config()

app.post("/class", createClass)