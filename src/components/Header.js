import { Link } from 'react-router-dom'

const Header = () => {
    const content = (
        <header>
            <Link to='/customers/new'> Ticket </Link>
            <Link to='/sections/get'> Sections </Link>
            <Link to='/customers'> All customers </Link>
            <Link to='/sections'> All sections </Link>
        </header>
    )

    return content
}

export default Header