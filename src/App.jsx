//import { createClient } from "@supabase/supabase-js"
import { useEffect, useState } from "react"
import Header from "./components/Header/Header.jsx"
import Sidebar from "./components/Sidebar/Sidebar.tsx"
import "./App.css"

//const supabase = createClient("https://mzxggfzyoilykqisvenx.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16eGdnZnp5b2lseWtxaXN2ZW54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc1MDk1MzAsImV4cCI6MjAyMzA4NTUzMH0.cbDp546DDaAUD7hx0ByXFp-ifweprGmxU-m8lTGTqPA")


function App() {
  const [machines, setMachines] = useState(null)

  useEffect(() => {
    fetch("/api/machines")
    .then((res) => {
      if(!res.ok) return null
      else return res.text()
    })
    ?.then((text) => setMachines(text))

  })

  return (
    <div id="App">
      <Header />
      <h2>{machines}</h2>
      <Sidebar parameter={machines}/>
    </div>
  )
}

export default App
