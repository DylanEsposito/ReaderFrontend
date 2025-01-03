// NavBar.js
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav id="router-nav-bar">
            <ul>
              <li><Link to="/">About</Link></li>
              <li><Link to="/Library">Library</Link></li>
              <li><Link to="/reader">Reader</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
