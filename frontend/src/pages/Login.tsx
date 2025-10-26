
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (login(username, password)) {
      toast({
        title: "Éxito",
        description: "¡Has iniciado sesión correctamente!",
      });
      navigate('/');
    } else {
      toast({
        title: "Error",
        description: "Credenciales inválidas. Prueba usuario: 'user' y contraseña: 'password'",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">Bienvenido de Vuelta</CardTitle>
          <CardDescription>Inicia sesión en tu cuenta de CocinaFit</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-medium">Usuario</label>
              <Input
                id="username"
                type="text"
                placeholder="Ingresa tu usuario (prueba: user)"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">Contraseña</label>
              <Input
                id="password"
                type="password"
                placeholder="Ingresa tu contraseña (prueba: password)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Iniciar Sesión
            </Button>
          </form>
          <div className="text-center text-sm">
            <Link to="/register" className="text-primary hover:underline">
              ¿No tienes cuenta? Regístrate
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
