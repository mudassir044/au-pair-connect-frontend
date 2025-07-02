import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Shield, MessageSquare, Calendar, Check, Users, Heart, Globe } from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: 'Verified Profiles',
      description: 'All members undergo thorough background checks and verification.',
    },
    {
      icon: MessageSquare,
      title: 'Real-time Messaging',
      description: 'Connect instantly with secure, built-in messaging.',
    },
    {
      icon: Calendar,
      title: 'Easy Scheduling',
      description: 'Schedule meetings and manage bookings effortlessly.',
    },
    {
      icon: Globe,
      title: 'Global Network',
      description: 'Connect with families and au pairs worldwide.',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Host Family',
      content: 'Found the perfect au pair for our family within weeks. The platform made everything so easy and secure.',
      rating: 5,
    },
    {
      name: 'Maria Rodriguez',
      role: 'Au Pair',
      content: 'Amazing experience! The family I found treats me like their own daughter. Highly recommend this platform.',
      rating: 5,
    },
    {
      name: 'David Chen',
      role: 'Host Family',
      content: 'Professional, trustworthy, and efficient. Our au pair has been wonderful with our children.',
      rating: 5,
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Create Your Profile',
      description: 'Sign up and tell us about yourself or your family.',
    },
    {
      number: '02',
      title: 'Get Matched',
      description: 'Our algorithm finds compatible matches based on your preferences.',
    },
    {
      number: '03',
      title: 'Connect & Chat',
      description: 'Message potential matches and get to know each other.',
    },
    {
      number: '04',
      title: 'Meet & Decide',
      description: 'Schedule video calls and make your decision.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container relative z-10 px-4 py-24 md:py-32">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col justify-center"
            >
              <Badge variant="secondary" className="mb-4 w-fit">
                Trusted by 10,000+ families worldwide
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Find Your Perfect
                <span className="bg-gradient-hero bg-clip-text text-transparent"> Au Pair Match</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground lg:text-xl">
                Connect families with trusted au pairs worldwide. Safe, secure, and designed to create lasting relationships.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button size="lg" variant="hero" asChild>
                  <Link to="/register">Find Your Match Today</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/how-it-works">Learn How It Works</Link>
                </Button>
              </div>
              <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Free to join</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Verified profiles</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Secure messaging</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src={heroImage}
                  alt="Happy family with au pair"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              
              {/* Floating Stats Cards */}
              <div className="absolute -bottom-6 -left-6 rounded-lg bg-background p-4 shadow-elegant">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                    <Heart className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">98% Success Rate</p>
                    <p className="text-xs text-muted-foreground">Happy matches</p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 rounded-lg bg-background p-4 shadow-elegant">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
                    <Users className="h-5 w-5 text-secondary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">10,000+</p>
                    <p className="text-xs text-muted-foreground">Active members</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Why Choose AuPairConnect?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Everything you need to find the perfect match, safely and securely.
            </p>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-0 bg-background shadow-card hover:shadow-elegant transition-shadow duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Simple steps to find your perfect match
            </p>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-primary text-2xl font-bold text-white">
                  {step.number}
                </div>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-muted/30">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              What Our Members Say
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Real stories from real families and au pairs
            </p>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-0 bg-background shadow-card">
                  <CardContent className="p-6">
                    <div className="mb-4 flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                      ))}
                    </div>
                    <p className="mb-4 text-sm italic">"{testimonial.content}"</p>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary via-primary to-secondary dark:from-primary dark:via-primary dark:to-secondary">
        <div className="container px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white dark:text-white">
              Ready to Find Your Perfect Match?
            </h2>
            <p className="mt-4 text-lg text-white/90 dark:text-white/90">
              Join thousands of families and au pairs who have found their perfect match.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/register">Get Started Today</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white/80 text-white/90 hover:bg-white hover:text-primary dark:border-white/80 dark:text-white/90 dark:hover:bg-white dark:hover:text-primary" asChild>
                <Link to="/how-it-works">Learn More</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;