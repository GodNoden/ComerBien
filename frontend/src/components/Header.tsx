
import React from 'react';
import { Button } from '@/components/ui/button';
import { UserRound, LogIn, UserPlus, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <a href='/' className="text-2xl font-bold text-primary">ComerBien</a>
          </div>

          <div className="flex items-center space-x-2">
            {!isLoggedIn ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/login')}
                  className="hover:bg-primary/10"
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  Iniciar Sesión
                </Button>

                <Button
                  size="sm"
                  onClick={() => navigate('/register')}
                  className="bg-primary hover:bg-primary/90"
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Registrarse
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-primary/10"
                  aria-label="User profile"
                  onClick={() => navigate('/profile')}
                >
                  <UserRound className="h-5 w-5 text-primary" />
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="hover:bg-primary/10"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Cerrar Sesión
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};


export default Header;
