import Cookies from 'js-cookie';

export interface OnboardingData {
  step: number;
  completedSteps: number[];
  role: 'au_pair' | 'host_family';
  personalInfo: {
    firstName: string;
    lastName: string;
    age?: number;
    phone: string;
    country: string;
    city: string;
    profilePhoto?: string;
  };
  auPairInfo?: {
    experience: string;
    languages: string[];
    education: string;
    certifications: string[];
    availability: string;
    preferredCountries: string[];
    childAgePreference: string[];
    specialSkills: string[];
    aboutMe: string;
  };
  hostFamilyInfo?: {
    familySize: number;
    children: Array<{
      age: number;
      interests: string[];
    }>;
    housingType: string;
    lifestyle: string[];
    requirements: string[];
    languages: string[];
    aboutFamily: string;
    workSchedule: string;
  };
}

const ONBOARDING_COOKIE_KEY = 'aupair_onboarding';
const ANALYTICS_COOKIE_KEY = 'aupair_analytics';

export const onboardingStorage = {
  save: (data: Partial<OnboardingData>) => {
    const existing = onboardingStorage.get();
    const updated = Object.assign({}, existing, data);
    Cookies.set(ONBOARDING_COOKIE_KEY, JSON.stringify(updated), { expires: 7 });
    
    // Track progress for analytics
    const analytics = {
      lastStep: data.step,
      completionPercentage: Math.round((data.completedSteps?.length || 0) / 6 * 100),
      timeSpent: Date.now(),
    };
    Cookies.set(ANALYTICS_COOKIE_KEY, JSON.stringify(analytics), { expires: 30 });
  },

  get: (): Partial<OnboardingData> => {
    const data = Cookies.get(ONBOARDING_COOKIE_KEY);
    if (data) {
      try {
        return JSON.parse(data);
      } catch {
        return {};
      }
    }
    return {};
  },

  clear: () => {
    Cookies.remove(ONBOARDING_COOKIE_KEY);
  },

  getAnalytics: () => {
    const data = Cookies.get(ANALYTICS_COOKIE_KEY);
    if (data) {
      try {
        return JSON.parse(data);
      } catch {
        return null;
      }
    }
    return null;
  }
};