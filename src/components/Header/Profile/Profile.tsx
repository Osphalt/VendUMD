import { useContext } from "react"
import SessionContext from "../../context/SessionContext"

export default function Profile() {
    const session = useContext(SessionContext)

    const username = session?.user.email?.substring(0, session.user.email.indexOf("@")) ?? "guest"

    return (<div className="flex ml-auto">
        <p className="p-2 m-4 font-bold">{username.charAt(0).toUpperCase() + username.substring(1)}</p>
    </div>)
}