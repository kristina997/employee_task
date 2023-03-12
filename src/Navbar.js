//import { Link } from "react-router-dom"

export default function Navbar() {
    return (
        <nav className="nav">
        <a href="/" className="site-title">See task and ask</a>
        <ul>
            <CustomLink href="/employee">Employees</CustomLink>
            <CustomLink href="/task">Tasks</CustomLink>
            <CustomLink href="/chart">Chart</CustomLink>
            <CustomLink href="/team">Teams</CustomLink>
        </ul>
      </nav>
    
    ) 
}

function CustomLink({ href, children, ...props }) {
    const path = window.location.pathname
    return (
        <li className={path === href ? "active" : ""}>
            <a href={href}{...props}>{children}</a>
        </li>
    )
}
