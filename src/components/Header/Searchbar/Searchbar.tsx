import QueryContext from "../../context/QueryContext"
import {FormEvent, useContext} from "react"
import "./Searchbar.css"

export default function Searchbar() {
    const queryInterface = useContext(QueryContext)

    const queryInput = (e: FormEvent<HTMLInputElement>) => {queryInterface?.setQuery(e.currentTarget.value)}

    return (<div className="flex w-fill">
        <input id="searchbar" onInput={queryInput} type="search" className="mi-auto searchbar rounded p-8" placeholder="Search" />
    </div>)
}