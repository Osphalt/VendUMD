import QueryContext from "../../context/QueryContext"
import {useContext} from "react"
import "./Searchbar.css"

export default function Searchbar() {
    const {setQuery} = useContext(QueryContext)

    return (<div className="flex w-fill">
        <input id="searchbar" onInput={(e) => setQuery(e.target.value)} type="search" className="mi-auto searchbar rounded p-8" placeholder="Search" />
    </div>)
}