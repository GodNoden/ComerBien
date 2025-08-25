
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold text-food-purple">Welcome Back</CardTitle>
                    <CardDescription>Sign in to your FoodTrack account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">Email</label>
                        <Input id="email" type="email" placeholder="Enter your email" />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-medium">Password</label>
                        <Input id="password" type="password" placeholder="Enter your password" />
                    </div>
                    <Button className="w-full bg-food-purple hover:bg-food-purple/90">
                        Sign In
                    </Button>
                    <div className="text-center text-sm">
                        <Link to="/register" className="text-food-purple hover:underline">
                            Don't have an account? Sign up
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;
