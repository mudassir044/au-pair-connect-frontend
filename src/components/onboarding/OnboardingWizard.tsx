import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { onboardingStorage, OnboardingData } from '@/lib/onboarding';
import { toast } from 'react-hot-toast';
import { 
  User, 
  MapPin, 
  Languages, 
  GraduationCap, 
  Heart, 
  Camera,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Star,
  Users,
  Home,
  Calendar,
  Award
} from 'lucide-react';

interface OnboardingWizardProps {
  onComplete: () => void;
}

export const OnboardingWizard: React.FC<OnboardingWizardProps> = ({ onComplete }) => {
  const { user, updateUser } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<OnboardingData>>({
    step: 1,
    completedSteps: [],
    role: user?.role as 'au_pair' | 'host_family',
    personalInfo: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      phone: '',
      country: '',
      city: '',
    },
    auPairInfo: {
      experience: '',
      languages: [],
      education: '',
      certifications: [],
      availability: '',
      preferredCountries: [],
      childAgePreference: [],
      specialSkills: [],
      aboutMe: '',
    },
    hostFamilyInfo: {
      familySize: 0,
      children: [],
      housingType: '',
      lifestyle: [],
      requirements: [],
      languages: [],
      aboutFamily: '',
      workSchedule: '',
    },
  });

  const totalSteps = user?.role === 'au_pair' ? 6 : 5;
  const progress = (currentStep / totalSteps) * 100;

  useEffect(() => {
    // Load saved onboarding data
    const saved = onboardingStorage.get();
    if (saved && Object.keys(saved).length > 0) {
      setFormData(saved);
      setCurrentStep(saved.step || 1);
    }
  }, []);

  useEffect(() => {
    // Save progress to cookies
    onboardingStorage.save(formData);
  }, [formData]);

  const updateFormData = (section: keyof OnboardingData, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: Object.assign({}, prev[section] || {}, data)
    }));
  };

  const markStepComplete = (step: number) => {
    setFormData(prev => ({
      ...prev,
      completedSteps: [...(prev.completedSteps || []), step].filter((v, i, a) => a.indexOf(v) === i)
    }));
  };

  const nextStep = () => {
    markStepComplete(currentStep);
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      setFormData(prev => ({ ...prev, step: currentStep + 1 }));
    } else {
      handleComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setFormData(prev => ({ ...prev, step: currentStep - 1 }));
    }
  };

  const handleComplete = () => {
    // Mark profile as complete
    updateUser({ profileComplete: true });
    onboardingStorage.clear();
    toast.success("Welcome aboard! Your profile is now complete! 🎉");
    onComplete();
  };

  const renderStepContent = () => {
    if (user?.role === 'au_pair') {
      switch (currentStep) {
        case 1:
          return <WelcomeStep role="au_pair" onNext={nextStep} />;
        case 2:
          return <PersonalInfoStep formData={formData} updateFormData={updateFormData} onNext={nextStep} onBack={prevStep} />;
        case 3:
          return <ExperienceStep formData={formData} updateFormData={updateFormData} onNext={nextStep} onBack={prevStep} />;
        case 4:
          return <PreferencesStep formData={formData} updateFormData={updateFormData} onNext={nextStep} onBack={prevStep} />;
        case 5:
          return <AboutMeStep formData={formData} updateFormData={updateFormData} onNext={nextStep} onBack={prevStep} />;
        case 6:
          return <PhotoStep formData={formData} updateFormData={updateFormData} onNext={nextStep} onBack={prevStep} />;
      }
    } else {
      switch (currentStep) {
        case 1:
          return <WelcomeStep role="host_family" onNext={nextStep} />;
        case 2:
          return <PersonalInfoStep formData={formData} updateFormData={updateFormData} onNext={nextStep} onBack={prevStep} />;
        case 3:
          return <FamilyInfoStep formData={formData} updateFormData={updateFormData} onNext={nextStep} onBack={prevStep} />;
        case 4:
          return <RequirementsStep formData={formData} updateFormData={updateFormData} onNext={nextStep} onBack={prevStep} />;
        case 5:
          return <PhotoStep formData={formData} updateFormData={updateFormData} onNext={nextStep} onBack={prevStep} />;
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Complete Your Profile</h1>
            <Badge variant="secondary">
              Step {currentStep} of {totalSteps}
            </Badge>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-muted-foreground mt-2">
            {Math.round(progress)}% complete • Takes about 5 minutes
          </p>
        </motion.div>

        {/* Step Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

// Welcome Step
const WelcomeStep: React.FC<{ role: string; onNext: () => void }> = ({ role, onNext }) => (
  <Card className="border-0 shadow-elegant">
    <CardContent className="p-8 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        {role === 'au_pair' ? (
          <Heart className="h-16 w-16 mx-auto text-primary" />
        ) : (
          <Users className="h-16 w-16 mx-auto text-primary" />
        )}
      </motion.div>
      
      <h2 className="text-3xl font-bold mb-4">
        Welcome to AuPairConnect! 🎉
      </h2>
      
      <p className="text-lg text-muted-foreground mb-8">
        {role === 'au_pair' 
          ? "Let's create your profile to help amazing families find you!"
          : "Let's set up your family profile to find the perfect au pair!"
        }
      </p>

      <div className="grid grid-cols-3 gap-4 mb-8 text-center">
        <div>
          <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500" />
          <p className="text-sm">Verified</p>
        </div>
        <div>
          <Star className="h-8 w-8 mx-auto mb-2 text-yellow-500" />
          <p className="text-sm">Trusted</p>
        </div>
        <div>
          <Award className="h-8 w-8 mx-auto mb-2 text-blue-500" />
          <p className="text-sm">Successful</p>
        </div>
      </div>

      <Button onClick={onNext} size="lg" variant="gradient" className="w-full">
        Get Started <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
    </CardContent>
  </Card>
);

// Personal Info Step
const PersonalInfoStep: React.FC<any> = ({ formData, updateFormData, onNext, onBack }) => {
  const [info, setInfo] = useState(formData.personalInfo || {});

  const handleSubmit = () => {
    if (!info.phone || !info.country || !info.city) {
      toast.error("Please fill in all required fields");
      return;
    }
    updateFormData('personalInfo', info);
    onNext();
  };

  return (
    <Card className="border-0 shadow-elegant">
      <CardHeader>
        <CardTitle className="flex items-center">
          <User className="mr-3 h-6 w-6" />
          Personal Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="age">Age *</Label>
            <Input
              id="age"
              type="number"
              value={info.age || ''}
              onChange={(e) => setInfo({...info, age: parseInt(e.target.value)})}
              placeholder="25"
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              value={info.phone || ''}
              onChange={(e) => setInfo({...info, phone: e.target.value})}
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="country">Country *</Label>
            <Select value={info.country} onValueChange={(value) => setInfo({...info, country: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="ca">Canada</SelectItem>
                <SelectItem value="au">Australia</SelectItem>
                <SelectItem value="de">Germany</SelectItem>
                <SelectItem value="fr">France</SelectItem>
                <SelectItem value="es">Spain</SelectItem>
                <SelectItem value="it">Italy</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="city">City *</Label>
            <Input
              id="city"
              value={info.city || ''}
              onChange={(e) => setInfo({...info, city: e.target.value})}
              placeholder="New York"
            />
          </div>
        </div>

        <div className="flex justify-between pt-6">
          <Button onClick={onBack} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button onClick={handleSubmit} variant="gradient">
            Continue <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Experience Step (Au Pair)
const ExperienceStep: React.FC<any> = ({ formData, updateFormData, onNext, onBack }) => {
  const [info, setInfo] = useState(formData.auPairInfo || {});

  const languages = ['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Chinese', 'Japanese'];
  const certifications = ['CPR Certified', 'First Aid', 'Swimming Instructor', 'Driving License', 'Teaching Certificate'];

  const toggleLanguage = (lang: string) => {
    const current = info.languages || [];
    const updated = current.includes(lang) 
      ? current.filter(l => l !== lang)
      : [...current, lang];
    setInfo({...info, languages: updated});
  };

  const toggleCertification = (cert: string) => {
    const current = info.certifications || [];
    const updated = current.includes(cert) 
      ? current.filter(c => c !== cert)
      : [...current, cert];
    setInfo({...info, certifications: updated});
  };

  const handleSubmit = () => {
    if (!info.experience || !info.education) {
      toast.error("Please fill in your experience and education");
      return;
    }
    updateFormData('auPairInfo', info);
    onNext();
  };

  return (
    <Card className="border-0 shadow-elegant">
      <CardHeader>
        <CardTitle className="flex items-center">
          <GraduationCap className="mr-3 h-6 w-6" />
          Experience & Education
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="experience">Years of Experience with Children *</Label>
          <Select value={info.experience} onValueChange={(value) => setInfo({...info, experience: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select experience level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="no-experience">No formal experience</SelectItem>
              <SelectItem value="less-than-1">Less than 1 year</SelectItem>
              <SelectItem value="1-2">1-2 years</SelectItem>
              <SelectItem value="3-5">3-5 years</SelectItem>
              <SelectItem value="5+">5+ years</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="education">Education Level *</Label>
          <Select value={info.education} onValueChange={(value) => setInfo({...info, education: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select education level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high-school">High School</SelectItem>
              <SelectItem value="some-college">Some College</SelectItem>
              <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
              <SelectItem value="master">Master's Degree</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Languages You Speak</Label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {languages.map(lang => (
              <Button
                key={lang}
                variant={info.languages?.includes(lang) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleLanguage(lang)}
                className="text-xs"
              >
                {lang}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label>Certifications</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {certifications.map(cert => (
              <Button
                key={cert}
                variant={info.certifications?.includes(cert) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleCertification(cert)}
                className="text-xs"
              >
                {cert}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex justify-between pt-6">
          <Button onClick={onBack} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button onClick={handleSubmit} variant="gradient">
            Continue <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Preferences Step (Au Pair)
const PreferencesStep: React.FC<any> = ({ formData, updateFormData, onNext, onBack }) => {
  const [info, setInfo] = useState(formData.auPairInfo || {});

  const countries = ['United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'France'];
  const ageGroups = ['0-2 years', '3-5 years', '6-10 years', '11+ years'];
  const skills = ['Cooking', 'Swimming', 'Music', 'Arts & Crafts', 'Sports', 'Tutoring', 'Pet Care'];

  const togglePreference = (key: string, value: string) => {
    const current = info[key] || [];
    const updated = current.includes(value) 
      ? current.filter(item => item !== value)
      : [...current, value];
    setInfo({...info, [key]: updated});
  };

  const handleSubmit = () => {
    updateFormData('auPairInfo', info);
    onNext();
  };

  return (
    <Card className="border-0 shadow-elegant">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Heart className="mr-3 h-6 w-6" />
          Your Preferences
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="availability">When Are You Available?</Label>
          <Select value={info.availability} onValueChange={(value) => setInfo({...info, availability: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Select availability" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="immediately">Immediately</SelectItem>
              <SelectItem value="1-month">Within 1 month</SelectItem>
              <SelectItem value="3-months">Within 3 months</SelectItem>
              <SelectItem value="6-months">Within 6 months</SelectItem>
              <SelectItem value="flexible">Flexible</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Preferred Countries</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {countries.map(country => (
              <Button
                key={country}
                variant={info.preferredCountries?.includes(country) ? "default" : "outline"}
                size="sm"
                onClick={() => togglePreference('preferredCountries', country)}
                className="text-xs"
              >
                {country}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label>Preferred Child Age Groups</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {ageGroups.map(age => (
              <Button
                key={age}
                variant={info.childAgePreference?.includes(age) ? "default" : "outline"}
                size="sm"
                onClick={() => togglePreference('childAgePreference', age)}
                className="text-xs"
              >
                {age}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label>Special Skills & Interests</Label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {skills.map(skill => (
              <Button
                key={skill}
                variant={info.specialSkills?.includes(skill) ? "default" : "outline"}
                size="sm"
                onClick={() => togglePreference('specialSkills', skill)}
                className="text-xs"
              >
                {skill}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex justify-between pt-6">
          <Button onClick={onBack} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button onClick={handleSubmit} variant="gradient">
            Continue <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// About Me Step
const AboutMeStep: React.FC<any> = ({ formData, updateFormData, onNext, onBack }) => {
  const [aboutMe, setAboutMe] = useState(formData.auPairInfo?.aboutMe || '');

  const handleSubmit = () => {
    if (!aboutMe.trim()) {
      toast.error("Please tell us about yourself");
      return;
    }
    updateFormData('auPairInfo', { aboutMe });
    onNext();
  };

  return (
    <Card className="border-0 shadow-elegant">
      <CardHeader>
        <CardTitle className="flex items-center">
          <User className="mr-3 h-6 w-6" />
          Tell Us About Yourself
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="aboutMe">About Me *</Label>
          <Textarea
            id="aboutMe"
            value={aboutMe}
            onChange={(e) => setAboutMe(e.target.value)}
            placeholder="Tell families about your personality, hobbies, and why you want to be an au pair..."
            className="min-h-32"
          />
          <p className="text-sm text-muted-foreground mt-2">
            {aboutMe.length}/500 characters • Make it personal and engaging!
          </p>
        </div>

        <div className="bg-muted/50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">💡 Tips for a great bio:</h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Share your personality and interests</li>
            <li>• Mention why you love working with children</li>
            <li>• Include fun facts about yourself</li>
            <li>• Keep it positive and friendly</li>
          </ul>
        </div>

        <div className="flex justify-between pt-6">
          <Button onClick={onBack} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button onClick={handleSubmit} variant="gradient">
            Continue <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Family Info Step (Host Family)
const FamilyInfoStep: React.FC<any> = ({ formData, updateFormData, onNext, onBack }) => {
  const [info, setInfo] = useState(formData.hostFamilyInfo || { children: [] });

  const addChild = () => {
    const newChild = { age: 0, interests: [] };
    setInfo({...info, children: [...info.children, newChild]});
  };

  const updateChild = (index: number, field: string, value: any) => {
    const updatedChildren = [...info.children];
    updatedChildren[index] = { ...updatedChildren[index], [field]: value };
    setInfo({...info, children: updatedChildren});
  };

  const removeChild = (index: number) => {
    const updatedChildren = info.children.filter((_, i) => i !== index);
    setInfo({...info, children: updatedChildren});
  };

  const handleSubmit = () => {
    if (!info.familySize || info.children.length === 0) {
      toast.error("Please add information about your family");
      return;
    }
    updateFormData('hostFamilyInfo', info);
    onNext();
  };

  return (
    <Card className="border-0 shadow-elegant">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Home className="mr-3 h-6 w-6" />
          Family Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="familySize">Total Family Size</Label>
          <Select value={info.familySize?.toString()} onValueChange={(value) => setInfo({...info, familySize: parseInt(value)})}>
            <SelectTrigger>
              <SelectValue placeholder="How many people in your family?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2">2 people</SelectItem>
              <SelectItem value="3">3 people</SelectItem>
              <SelectItem value="4">4 people</SelectItem>
              <SelectItem value="5">5 people</SelectItem>
              <SelectItem value="6">6+ people</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <Label>Children Information</Label>
            <Button onClick={addChild} variant="outline" size="sm">
              Add Child
            </Button>
          </div>
          
          {info.children.map((child, index) => (
            <div key={index} className="border border-border rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium">Child {index + 1}</h4>
                <Button onClick={() => removeChild(index)} variant="ghost" size="sm">
                  Remove
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Age</Label>
                  <Input
                    type="number"
                    value={child.age}
                    onChange={(e) => updateChild(index, 'age', parseInt(e.target.value))}
                    placeholder="Age"
                  />
                </div>
                <div>
                  <Label>Interests</Label>
                  <Input
                    value={child.interests?.join(', ')}
                    onChange={(e) => updateChild(index, 'interests', e.target.value.split(', ').filter(Boolean))}
                    placeholder="Sports, Reading, Music..."
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between pt-6">
          <Button onClick={onBack} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button onClick={handleSubmit} variant="gradient">
            Continue <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Requirements Step (Host Family)
const RequirementsStep: React.FC<any> = ({ formData, updateFormData, onNext, onBack }) => {
  const [info, setInfo] = useState(formData.hostFamilyInfo || {});

  const lifestyleOptions = ['Active Family', 'Quiet Home', 'Social Family', 'Travel Often', 'Pet Owners'];
  const requirements = ['Non-Smoker', 'Swimming Ability', 'Driving License', 'Cooking Skills', 'Language Skills'];
  const languages = ['English', 'Spanish', 'French', 'German', 'Italian'];

  const toggleOption = (key: string, value: string) => {
    const current = info[key] || [];
    const updated = current.includes(value) 
      ? current.filter(item => item !== value)
      : [...current, value];
    setInfo({...info, [key]: updated});
  };

  const handleSubmit = () => {
    updateFormData('hostFamilyInfo', info);
    onNext();
  };

  return (
    <Card className="border-0 shadow-elegant">
      <CardHeader>
        <CardTitle className="flex items-center">
          <CheckCircle className="mr-3 h-6 w-6" />
          Requirements & Lifestyle
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label>Family Lifestyle</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {lifestyleOptions.map(option => (
              <Button
                key={option}
                variant={info.lifestyle?.includes(option) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleOption('lifestyle', option)}
                className="text-xs"
              >
                {option}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label>Au Pair Requirements</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {requirements.map(req => (
              <Button
                key={req}
                variant={info.requirements?.includes(req) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleOption('requirements', req)}
                className="text-xs"
              >
                {req}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label>Preferred Languages</Label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {languages.map(lang => (
              <Button
                key={lang}
                variant={info.languages?.includes(lang) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleOption('languages', lang)}
                className="text-xs"
              >
                {lang}
              </Button>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="aboutFamily">About Your Family</Label>
          <Textarea
            id="aboutFamily"
            value={info.aboutFamily || ''}
            onChange={(e) => setInfo({...info, aboutFamily: e.target.value})}
            placeholder="Tell au pairs about your family, values, and what makes you special..."
            className="min-h-32"
          />
        </div>

        <div className="flex justify-between pt-6">
          <Button onClick={onBack} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button onClick={handleSubmit} variant="gradient">
            Continue <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Photo Step
const PhotoStep: React.FC<any> = ({ formData, updateFormData, onNext, onBack }) => {
  const [photoUploaded, setPhotoUploaded] = useState(false);

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you'd upload to your backend here
      setPhotoUploaded(true);
      updateFormData('personalInfo', { profilePhoto: 'uploaded' });
      toast.success("Photo uploaded successfully!");
    }
  };

  const handleSubmit = () => {
    onNext();
  };

  return (
    <Card className="border-0 shadow-elegant">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Camera className="mr-3 h-6 w-6" />
          Add Your Profile Photo
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto bg-muted rounded-full flex items-center justify-center mb-4">
            {photoUploaded ? (
              <CheckCircle className="h-16 w-16 text-green-500" />
            ) : (
              <Camera className="h-16 w-16 text-muted-foreground" />
            )}
          </div>
          
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
            id="photo-upload"
          />
          
          <label htmlFor="photo-upload">
            <Button variant={photoUploaded ? "outline" : "gradient"} size="lg" asChild>
              <span className="cursor-pointer">
                {photoUploaded ? "Change Photo" : "Upload Photo"}
              </span>
            </Button>
          </label>
          
          <p className="text-sm text-muted-foreground mt-4">
            A great photo helps you get more matches!
          </p>
        </div>

        <div className="bg-muted/50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">📸 Photo Tips:</h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Use a clear, recent photo of yourself</li>
            <li>• Smile and look friendly</li>
            <li>• Good lighting makes a big difference</li>
            <li>• Avoid group photos or sunglasses</li>
          </ul>
        </div>

        <div className="flex justify-between pt-6">
          <Button onClick={onBack} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button onClick={handleSubmit} variant="gradient">
            {photoUploaded ? (
              <>Complete Profile <CheckCircle className="ml-2 h-4 w-4" /></>
            ) : (
              <>Skip for Now <ArrowRight className="ml-2 h-4 w-4" /></>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};