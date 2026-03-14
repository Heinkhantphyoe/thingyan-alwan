import React from 'react';
import { NavLink } from 'react-router-dom';
import { Music, History, BookOpen, User as UserIcon } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-200 py-3 px-6 flex justify-around items-center z-50 md:top-0 md:bottom-auto md:border-t-0 md:border-b">
      <NavLink 
        to="/" 
        className={({ isActive }) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-water-blue' : 'text-gray-500 hover:text-gray-700'}`}
      >
        <Music size={24} />
        <span className="text-xs font-medium">Player</span>
      </NavLink>
      <NavLink 
        to="/archive" 
        className={({ isActive }) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-water-blue' : 'text-gray-500 hover:text-gray-700'}`}
      >
        <History size={24} />
        <span className="text-xs font-medium">Archive</span>
      </NavLink>
      <NavLink 
        to="/traditions" 
        className={({ isActive }) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-water-blue' : 'text-gray-500 hover:text-gray-700'}`}
      >
        <BookOpen size={24} />
        <span className="text-xs font-medium">Traditions</span>
      </NavLink>
      <NavLink 
        to={user ? "/profile" : "/login"}
        className={({ isActive }) => `flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-water-blue' : 'text-gray-500 hover:text-gray-700'}`}
      >
        {({ isActive }) => (
          <>
            {user && user.user_metadata?.avatar_url ? (
              <img 
                src={user.user_metadata.avatar_url} 
                alt="Profile" 
                className={`w-6 h-6 rounded-full object-cover border ${isActive ? 'border-water-blue' : 'border-gray-300'}`} 
              />
            ) : (
              <UserIcon size={24} />
            )}
            <span className="text-xs font-medium">{user ? "Profile" : "Login"}</span>
          </>
        )}
      </NavLink>
    </nav>
  );
};

export default Navbar;
