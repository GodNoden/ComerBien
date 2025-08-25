
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from '@/components/ui/sheet';
import { UserRound, Menu, BookOpen, CalendarDays, Plus, LogIn, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <div className="flex items-center">
                        <h1 className="text-2xl font-bold text-food-purple">FoodTrack</h1>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate('/login')}
                            className="hover:bg-food-soft-purple"
                        >
                            <LogIn className="h-4 w-4 mr-2" />
                            Login
                        </Button>

                        <Button
                            size="sm"
                            onClick={() => navigate('/register')}
                            className="bg-food-purple hover:bg-food-purple/90"
                        >
                            <UserPlus className="h-4 w-4 mr-2" />
                            Sign Up
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full hover:bg-food-soft-purple"
                            aria-label="User profile"
                        >
                            <UserRound className="h-5 w-5 text-food-purple" />
                        </Button>

                        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                            <SheetTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="rounded-full hover:bg-food-soft-purple"
                                    aria-label="Menu"
                                >
                                    <Menu className="h-5 w-5 text-food-purple" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent className="bg-white border-l border-gray-200">
                                <SheetHeader>
                                    <SheetTitle className="text-food-purple">Menu</SheetTitle>
                                </SheetHeader>
                                <div className="py-6 space-y-4">
                                    <MenuItem icon={<BookOpen className="h-5 w-5" />} label="Recipes" />
                                    <MenuItem icon={<CalendarDays className="h-5 w-5" />} label="Weekly Menu" />
                                    <MenuItem icon={<Plus className="h-5 w-5" />} label="Add Recipe" />
                                    <MenuItem icon={<UserRound className="h-5 w-5" />} label="Profile" />
                                </div>
                                <div className="mt-8 p-4 bg-food-soft-purple rounded-lg">
                                    <h3 className="font-medium text-food-purple">Your Progress</h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-600">You've cooked 12 recipes this month!</p>
                                        <div className="mt-2 w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div className="h-full bg-food-purple rounded-full" style={{ width: '60%' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
};

// Helper component for menu items
const MenuItem = ({ icon, label }: { icon: React.ReactNode, label: string; }) => (
    <div className="flex items-center space-x-3 px-2 py-3 rounded-lg hover:bg-food-light-green cursor-pointer transition-colors">
        <div className="text-food-purple">{icon}</div>
        <span className="font-medium">{label}</span>
    </div>
);

export default Header;
