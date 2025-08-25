
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-bold text-food-purple">Join FoodTrack</CardTitle>
                    <CardDescription>Create your account to start tracking your meals</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                        <Input id="name" type="text" placeholder="Enter your full name" />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">Email</label>
                        <Input id="email" type="email" placeholder="Enter your email" />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-medium">Password</label>
                        <Input id="password" type="password" placeholder="Create a password" />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</label>
                        <Input id="confirmPassword" type="password" placeholder="Confirm your password" />
                    </div>
                    <Button className="w-full bg-food-purple hover:bg-food-purple/90">
                        Create Account
                    </Button>
                    <div className="text-center text-sm">
                        <Link to="/login" className="text-food-purple hover:underline">
                            Already have an account? Sign in
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Register;
