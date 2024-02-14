import express from "express"
import ViteExpress from "vite-express"
import "dotenv/config"

const PORT = process.env.PORT
const app = express()

if(process.env.NODE_ENV == "production") ViteExpress.config({mode: process.env.NODE_ENV})

app.get("/api/machines", (req,res) => {
    res.send("Vending Machines...")
})

ViteExpress.listen(app, PORT, () => console.log("Server is listening on port " + PORT))