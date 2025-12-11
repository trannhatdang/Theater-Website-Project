import { Link } from 'react-router-dom';
import Logo from './Logo.tsx';
import Button from '@mui/material/Button';

export default function Navbar() {
  return (
    <div className="flex bg-slate-700 w-screen h-30 rounded-xs mb-10 p-4">
      <Logo />
      <div className="flex-1 w-screen" />
      <div className="flex">
        {/* Use Link for SPA navigation */}
        <Button component={Link} to="/">Home</Button>
        <Button component={Link} to="/film">Film</Button>
        <Button component={Link} to="/promotion">Promotion</Button>
        <Button component={Link} to="/event">Event</Button>

        {/* Keep href for now */}
        <Button href="./login">Login</Button>
        <Button href="./admin">Admin</Button>
      </div>
    </div>
  );
}
