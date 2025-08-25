
import React from 'react';
import Header from '@/components/Header';
import FeaturedRecipes from '@/components/FeaturedRecipes';
import ActionButtons from '@/components/ActionButtons';
import InfoCards from '@/components/InfoCards';

const Index = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            {/* Welcome Banner moved to top */}
            <div className="bg-linear-to-r from-food-soft-purple to-food-light-green py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl sm:text-5xl font-bold text-food-purple mb-4">Welcome to FoodTrack</h1>
                        <p className="text-gray-700 text-lg max-w-2xl mx-auto">
                            Discover delicious recipes, track your cooking progress, and plan your meals for the week.
                        </p>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
                {/* Info Cards in place of the original banner */}
                <InfoCards />

                <FeaturedRecipes />
            </main>

            <ActionButtons />
        </div>
    );
};

export default Index;
