import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  UserPlus, 
  Search, 
  MessageSquare, 
  Calendar,
  Shield,
  FileCheck,
  Heart,
  Star,
  CheckCircle
} from 'lucide-react';

const HowItWorksPage: React.FC = () => {
  const auPairSteps = [
    {
      icon: UserPlus,
      title: 'Create Profile',
      description: 'Share your experience, skills, and what you\'re looking for in a host family.',
    },
    {
      icon: FileCheck,
      title: 'Get Verified',
      description: 'Upload references, certifications, and complete background checks.',
    },
    {
      icon: Search,
      title: 'Browse Families',
      description: 'Explore host family profiles and find those that match your preferences.',
    },
    {
      icon: MessageSquare,
      title: 'Connect',
      description: 'Message families you\'re interested in and build relationships.',
    },
    {
      icon: Calendar,
      title: 'Schedule Interviews',
      description: 'Arrange video calls and meet your potential host family.',
    },
    {
      icon: Heart,
      title: 'Start Your Journey',
      description: 'Begin your cultural exchange experience with your perfect match.',
    },
  ];

  const hostFamilySteps = [
    {
      icon: UserPlus,
      title: 'Create Profile',
      description: 'Tell us about your family, children, and what you\'re looking for in an au pair.',
    },
    {
      icon: Shield,
      title: 'Safety First',
      description: 'Complete verification process to ensure a safe environment for everyone.',
    },
    {
      icon: Search,
      title: 'Find Au Pairs',
      description: 'Browse verified au pair profiles that match your family\'s needs.',
    },
    {
      icon: MessageSquare,
      title: 'Connect',
      description: 'Reach out to au pairs and start meaningful conversations.',
    },
    {
      icon: Calendar,
      title: 'Interview Process',
      description: 'Schedule video calls and get to know potential au pairs.',
    },
    {
      icon: Heart,
      title: 'Welcome Home',
      description: 'Welcome your new au pair and begin this wonderful journey together.',
    },
  ];

  const benefits = [
    {
      icon: Shield,
      title: 'Verified Safety',
      description: 'All members undergo comprehensive background checks and verification.',
    },
    {
      icon: Star,
      title: 'Quality Matches',
      description: 'Our algorithm ensures compatible matches based on preferences and lifestyle.',
    },
    {
      icon: MessageSquare,
      title: 'Secure Communication',
      description: 'Built-in messaging system keeps all communication safe and private.',
    },
    {
      icon: FileCheck,
      title: 'Document Management',
      description: 'Easy upload and management of contracts, references, and certifications.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge variant="secondary" className="mb-4">
              Simple & Secure Process
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              How <span className="bg-gradient-hero bg-clip-text text-transparent">AuPairConnect</span> Works
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Discover how easy it is to find your perfect match. Whether you're a family looking for an au pair or an au pair seeking a host family, we've made the process simple, safe, and effective.
            </p>
          </motion.div>
        </div>
      </section>

      {/* For Au Pairs Section */}
      <section className="py-24">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              For Au Pairs
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Start your cultural exchange journey with the perfect host family
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {auPairSteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-0 bg-background shadow-card hover:shadow-elegant transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 flex-shrink-0">
                        <step.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-sm font-medium text-primary">Step {index + 1}</span>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* For Host Families Section */}
      <section className="py-24 bg-muted/30">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              For Host Families
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Find the perfect au pair to become part of your family
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {hostFamilySteps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-0 bg-background shadow-card hover:shadow-elegant transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10 flex-shrink-0">
                        <step.icon className="h-6 w-6 text-secondary" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-sm font-medium text-secondary">Step {index + 1}</span>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Why Choose Us?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We provide everything you need for a successful matching experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary">
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-hero text-white">
        <div className="container px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to Get Started?
            </h2>
            <p className="mt-4 text-lg opacity-90">
              Join thousands of families and au pairs who have found their perfect match.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/register">Sign Up Now</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary" asChild>
                <Link to="/">Learn More</Link>
              </Button>
            </div>
            <div className="mt-8 flex items-center justify-center gap-6 text-sm opacity-90">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>Free to join</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>Verified profiles</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>24/7 support</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage;