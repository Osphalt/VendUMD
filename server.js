import express from "express"
import ViteExpress from "vite-express"
import "dotenv/config"
import { createClient } from "@supabase/supabase-js"

const PORT = process.env.PORT
const app = express()

if(process.env.NODE_ENV == "production") ViteExpress.config({mode: process.env.NODE_ENV})

//supbase setup
const supabase = createClient("https://mzxggfzyoilykqisvenx.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16eGdnZnp5b2lseWtxaXN2ZW54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc1MDk1MzAsImV4cCI6MjAyMzA4NTUzMH0.cbDp546DDaAUD7hx0ByXFp-ifweprGmxU-m8lTGTqPA")


//locations
app.get("/api/locations", async (req,res) => {
    const {data, error} = await supabase.from("locations").select()
    if(error) {
        console.log(error)
        res.status(500).json([])
        return
    }

    if(!data || data.length == 0) {res.status(404).json([]); return}

    res.status(200).json(data)
})

app.get("/api/locations/:id", async (req,res) => {
    const {data, error} = await supabase.from("locations").select().eq("id", req.params["id"])
    if(error) {
        console.log(error)
        res.status(500).json([])
        return
    }

    if(!data || data.length == 0) {res.status(404).json([]); return}

    res.status(200).json(data)
})

app.get("/api/locations/list", async (req,res) => {
    const idList = req.params["q"].split(",")
    if(!idList || idList.length == 0) {res.status(400).json([]); return}
    idList = idList.map((item) => {if(!isNaN(item)) return parseInt(item)})

    const {data, error} = await supabase.from("locations").select().in("id", idList)
    if(error) {
        console.log(error)
        res.status(500).json([])
        return
    }

    if(!data || data.length == 0) {res.status(404).json([]); return}

    res.status(200).json(data)
})


//machines
app.get("/api/machines", (req,res) => {
    res.send("machines")
})

app.get("/api/machines/:id", (req,res) => {
    res.send("machine")
})

app.get("/api/machines/list", (req,res) => {
    res.send("machine list")
})


//contents
app.get("/api/contents", (req,res) => {
    res.send("contents")
})

app.get("/api/contents/:id", (req,res) => {
    res.send("content")
})

app.get("/api/contents/list", (req,res) => {
    res.send("contents list")
})


//users - wip

//reviews - wip 

ViteExpress.listen(app, PORT, () => console.log("Server is listening on port " + PORT))