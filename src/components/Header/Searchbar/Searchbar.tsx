import {QueryContext} from "../../context/QueryContext"
import {FormEvent, useContext} from "react"
import "./Searchbar.css"

export default function Searchbar() {
    const setQuery = useContext(QueryContext)[1]

    const queryInput = (e: FormEvent<HTMLInputElement>) => {setQuery(e.currentTarget.value)}

    return (<div className="flex w-fill">
        <input id="searchbar" onInput={queryInput} type="search" className="mi-auto searchbar rounded p-8" placeholder="Search" />
    </div>)
}