
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';

const commonAllergens = [
    'Milk',
    'Eggs',
    'Fish',
    'Shellfish',
    'Tree nuts',
    'Peanuts',
    'Wheat',
    'Soybeans',
    'Sesame'
];

const commonDislikes = [
    'Mushrooms',
    'Onions',
    'Garlic',
    'Cilantro',
    'Olives',
    'Tomatoes',
    'Peppers',
    'Coconut',
    'Spicy food',
    'Seafood',
    'Red meat',
    'Dairy'
];

const Profile = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [allergies, setAllergies] = useState<string[]>([]);
    const [dislikes, setDislikes] = useState<string[]>([]);

    // Personal information for calorie calculation
    const [personalInfo, setPersonalInfo] = useState({
        age: '',
        height: '',
        weight: '',
        gender: '',
        activityLevel: '',
        weightGoal: 'maintain' // gain, lose, maintain
    });

    // Load existing profile data on component mount
    useEffect(() => {
        const savedProfile = localStorage.getItem('userProfile');
        if (savedProfile) {
            try {
                const profileData = JSON.parse(savedProfile);
                if (profileData.allergies) setAllergies(profileData.allergies);
                if (profileData.dislikes) setDislikes(profileData.dislikes);
                if (profileData.personalInfo) setPersonalInfo(profileData.personalInfo);
            } catch (error) {
                console.error('Error loading profile:', error);
            }
        }
    }, []);

    const calculateRecommendedCalories = () => {
        const { age, height, weight, gender, activityLevel, weightGoal } = personalInfo;

        if (!age || !height || !weight || !gender || !activityLevel) {
            return 0;
        }

        // Calculate BMR using Mifflin-St Jeor Equation
        let bmr = 0;
        if (gender === 'male') {
            bmr = 10 * parseFloat(weight) + 6.25 * parseFloat(height) - 5 * parseFloat(age) + 5;
        } else {
            bmr = 10 * parseFloat(weight) + 6.25 * parseFloat(height) - 5 * parseFloat(age) - 161;
        }

        // Apply activity factor
        const activityFactors: { [key: string]: number; } = {
            'sedentary': 1.2,
            'light': 1.375,
            'moderate': 1.55,
            'very': 1.725,
            'extreme': 1.9
        };

        let maintenanceCalories = Math.round(bmr * activityFactors[activityLevel]);

        // Adjust calories based on weight goal
        if (weightGoal === 'lose') {
            maintenanceCalories -= 500; // 1 lb per week loss
        } else if (weightGoal === 'gain') {
            maintenanceCalories += 500; // 1 lb per week gain
        }

        return maintenanceCalories;
    };

    const handleAllergyChange = (allergen: string, checked: boolean) => {
        if (checked) {
            setAllergies(prev => [...prev, allergen]);
        } else {
            setAllergies(prev => prev.filter(item => item !== allergen));
        }
    };

    const handleDislikeChange = (dislike: string, checked: boolean) => {
        if (checked) {
            setDislikes(prev => [...prev, dislike]);
        } else {
            setDislikes(prev => prev.filter(item => item !== dislike));
        }
    };

    const handlePersonalInfoChange = (field: string, value: string) => {
        setPersonalInfo(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        const profileData = {
            allergies,
            dislikes,
            personalInfo,
            recommendedCalories: calculateRecommendedCalories(),
            lastSaved: new Date().toISOString()
        };

        // Save to localStorage
        localStorage.setItem('userProfile', JSON.stringify(profileData));

        console.log('Profile saved:', profileData);

        toast({
            title: "Profile saved successfully!",
            description: "Your preferences and data have been saved. You won't need to re-enter them next time.",
        });
    };

    const hasUnsavedChanges = () => {
        const savedProfile = localStorage.getItem('userProfile');
        if (!savedProfile) return true;

        try {
            const saved = JSON.parse(savedProfile);
            return JSON.stringify({ allergies, dislikes, personalInfo }) !==
                JSON.stringify({
                    allergies: saved.allergies || [],
                    dislikes: saved.dislikes || [],
                    personalInfo: saved.personalInfo || {}
                });
        } catch {
            return true;
        }
    };

    const recommendedCalories = calculateRecommendedCalories();

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-4">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => navigate('/')}
                            >
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                            <h1 className="text-xl font-semibold text-gray-900">Profile Settings</h1>
                        </div>
                        <Button
                            onClick={handleSave}
                            className={`${hasUnsavedChanges()
                                ? 'bg-primary hover:bg-primary/90'
                                : 'bg-green-600 hover:bg-green-700'
                                }`}
                        >
                            <Save className="h-4 w-4 mr-2" />
                            {hasUnsavedChanges() ? 'Save Changes' : 'Saved ✓'}
                        </Button>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Personal Information Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-blue-600 flex items-center gap-2">
                                📊 Personal Information
                            </CardTitle>
                            <p className="text-sm text-gray-600">
                                Enter your personal details to calculate your recommended daily calorie intake.
                            </p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="age">Age</Label>
                                    <Input
                                        id="age"
                                        type="number"
                                        placeholder="25"
                                        value={personalInfo.age}
                                        onChange={(e) => handlePersonalInfoChange('age', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="weight">Weight (kg)</Label>
                                    <Input
                                        id="weight"
                                        type="number"
                                        placeholder="70"
                                        value={personalInfo.weight}
                                        onChange={(e) => handlePersonalInfoChange('weight', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="height">Height (cm)</Label>
                                <Input
                                    id="height"
                                    type="number"
                                    placeholder="175"
                                    value={personalInfo.height}
                                    onChange={(e) => handlePersonalInfoChange('height', e.target.value)}
                                />
                            </div>

                            <div>
                                <Label htmlFor="gender">Gender</Label>
                                <Select value={personalInfo.gender} onValueChange={(value) => handlePersonalInfoChange('gender', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select gender" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="male">Male</SelectItem>
                                        <SelectItem value="female">Female</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label htmlFor="activity">Activity Level</Label>
                                <Select value={personalInfo.activityLevel} onValueChange={(value) => handlePersonalInfoChange('activityLevel', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select activity level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="sedentary">Sedentary (little/no exercise)</SelectItem>
                                        <SelectItem value="light">Light (1-3 days/week)</SelectItem>
                                        <SelectItem value="moderate">Moderate (3-5 days/week)</SelectItem>
                                        <SelectItem value="very">Very active (6-7 days/week)</SelectItem>
                                        <SelectItem value="extreme">Extremely active (2x/day)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label>Weight Goal</Label>
                                <RadioGroup
                                    value={personalInfo.weightGoal}
                                    onValueChange={(value) => handlePersonalInfoChange('weightGoal', value)}
                                    className="mt-2"
                                >
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="lose" id="lose" />
                                        <label htmlFor="lose" className="text-sm font-medium">Lose Weight (-500 cal/day)</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="maintain" id="maintain" />
                                        <label htmlFor="maintain" className="text-sm font-medium">Maintain Weight</label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="gain" id="gain" />
                                        <label htmlFor="gain" className="text-sm font-medium">Gain Weight (+500 cal/day)</label>
                                    </div>
                                </RadioGroup>
                            </div>

                            {recommendedCalories > 0 && (
                                <div className="bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg border border-blue-200">
                                    <h4 className="font-medium text-blue-800 mb-1">
                                        {personalInfo.weightGoal === 'lose' && 'Weight Loss Goal'}
                                        {personalInfo.weightGoal === 'gain' && 'Weight Gain Goal'}
                                        {personalInfo.weightGoal === 'maintain' && 'Maintenance Goal'}
                                    </h4>
                                    <p className="text-2xl font-bold text-blue-600">{recommendedCalories} calories/day</p>
                                    <p className="text-sm text-blue-700 mt-1">
                                        {personalInfo.weightGoal === 'lose' && 'For healthy 1 lb/week weight loss'}
                                        {personalInfo.weightGoal === 'gain' && 'For healthy 1 lb/week weight gain'}
                                        {personalInfo.weightGoal === 'maintain' && 'To maintain your current weight'}
                                    </p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Allergies Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-red-600 flex items-center gap-2">
                                ⚠️ Allergies & Intolerances
                            </CardTitle>
                            <p className="text-sm text-gray-600">
                                Select any food allergies or intolerances you have. These ingredients will be avoided in recipe recommendations.
                            </p>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {commonAllergens.map((allergen) => (
                                    <div key={allergen} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`allergy-${allergen}`}
                                            checked={allergies.includes(allergen)}
                                            onCheckedChange={(checked) => handleAllergyChange(allergen, checked as boolean)}
                                        />
                                        <label
                                            htmlFor={`allergy-${allergen}`}
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            {allergen}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Dislikes Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-orange-600 flex items-center gap-2">
                                👎 Food Dislikes
                            </CardTitle>
                            <p className="text-sm text-gray-600">
                                Select foods you don't like. We'll try to minimize these in your recipe suggestions.
                            </p>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {commonDislikes.map((dislike) => (
                                    <div key={dislike} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`dislike-${dislike}`}
                                            checked={dislikes.includes(dislike)}
                                            onCheckedChange={(checked) => handleDislikeChange(dislike, checked as boolean)}
                                        />
                                        <label
                                            htmlFor={`dislike-${dislike}`}
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            {dislike}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Summary Section */}
                {(allergies.length > 0 || dislikes.length > 0 || recommendedCalories > 0) && (
                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle>Your Preferences Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {recommendedCalories > 0 && (
                                <div className="mb-4">
                                    <h4 className="font-medium text-blue-600 mb-2">Daily Calorie Goal:</h4>
                                    <span className="bg-blue-100 text-blue-800 px-3 py-2 rounded-full text-lg font-semibold">
                                        {recommendedCalories} calories
                                    </span>
                                </div>
                            )}

                            {allergies.length > 0 && (
                                <div className="mb-4">
                                    <h4 className="font-medium text-red-600 mb-2">Allergies & Intolerances:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {allergies.map((allergen) => (
                                            <span
                                                key={allergen}
                                                className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs"
                                            >
                                                {allergen}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {dislikes.length > 0 && (
                                <div className="mb-4">
                                    <h4 className="font-medium text-orange-600 mb-2">Food Dislikes:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {dislikes.map((dislike) => (
                                            <span
                                                key={dislike}
                                                className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs"
                                            >
                                                {dislike}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                )}

                {/* Save Section */}
                <Card className="mt-6 bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">Save Your Profile</h3>
                                <p className="text-sm text-gray-600">
                                    {hasUnsavedChanges()
                                        ? "You have unsaved changes. Click save to store your preferences permanently."
                                        : "Your profile is saved. All your preferences will be remembered when you return."
                                    }
                                </p>
                            </div>
                            <div className="flex gap-3">
                                {hasUnsavedChanges() && (
                                    <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                                        Unsaved Changes
                                    </div>
                                )}
                                <Button
                                    onClick={handleSave}
                                    size="lg"
                                    className={`${hasUnsavedChanges()
                                        ? 'bg-primary hover:bg-primary/90 shadow-lg'
                                        : 'bg-green-600 hover:bg-green-700'
                                        }`}
                                >
                                    <Save className="h-5 w-5 mr-2" />
                                    {hasUnsavedChanges() ? 'Save All Changes' : 'Profile Saved ✓'}
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Profile;
