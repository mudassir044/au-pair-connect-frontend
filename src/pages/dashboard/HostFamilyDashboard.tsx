import React from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Users, 
  MessageSquare, 
  Calendar, 
  FileText,
  Star,
  MapPin,
  Clock,
  Heart
} from 'lucide-react';

const HostFamilyDashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Profile Views',
      value: '89',
      icon: Users,
      change: '+8%',
      changeType: 'positive' as const,
    },
    {
      title: 'Interested Au Pairs',
      value: '12',
      icon: Heart,
      change: '+4',
      changeType: 'positive' as const,
    },
    {
      title: 'Conversations',
      value: '6',
      icon: MessageSquare,
      change: '+2',
      changeType: 'positive' as const,
    },
    {
      title: 'Interviews Scheduled',
      value: '2',
      icon: Calendar,
      change: 'This week',
      changeType: 'neutral' as const,
    },
  ];

  const topMatches = [
    {
      id: 1,
      name: 'Maria Santos',
      age: 22,
      country: 'Spain',
      experience: '3 years',
      languages: ['Spanish', 'English', 'French'],
      rating: 4.9,
      matchScore: 96,
      availability: 'Available now',
    },
    {
      id: 2,
      name: 'Sophie Mueller',
      age: 20,
      country: 'Germany',
      experience: '2 years',
      languages: ['German', 'English'],
      rating: 4.8,
      matchScore: 94,
      availability: 'Available from March',
    },
    {
      id: 3,
      name: 'Lucia Rossi',
      age: 21,
      country: 'Italy',
      experience: '1 year',
      languages: ['Italian', 'English'],
      rating: 4.7,
      matchScore: 91,
      availability: 'Available now',
    },
  ];

  const upcomingInterviews = [
    {
      id: 1,
      candidate: 'Maria Santos',
      date: 'Today',
      time: '2:00 PM',
      type: 'Video Call',
      status: 'confirmed',
    },
    {
      id: 2,
      candidate: 'Sophie Mueller',
      date: 'Friday',
      time: '4:00 PM',
      type: 'Phone Call',
      status: 'pending',
    },
  ];

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-8 p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                Welcome back, {user?.firstName}!
              </h1>
              <p className="text-muted-foreground">
                Here's an overview of your au pair search progress.
              </p>
            </div>
            <Button variant="gradient" size="lg">
              Browse Au Pairs
            </Button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <Card key={stat.title} className="border-0 shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between space-y-0 pb-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <Badge
                    variant={
                      stat.changeType === 'positive'
                        ? 'default'
                        : 'secondary'
                    }
                    className="text-xs"
                  >
                    {stat.change}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Top Matches */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="border-0 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Top Au Pair Matches</span>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {topMatches.map((match) => (
                  <div
                    key={match.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">{match.name}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {match.matchScore}% match
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {match.country}
                        </span>
                        <span>Age {match.age}</span>
                        <span className="flex items-center">
                          <Star className="h-3 w-3 mr-1 fill-current text-yellow-400" />
                          {match.rating}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {match.languages.slice(0, 2).map((lang) => (
                          <Badge key={lang} variant="outline" className="text-xs">
                            {lang}
                          </Badge>
                        ))}
                        {match.languages.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{match.languages.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <Button size="sm" variant="gradient">
                        Contact
                      </Button>
                      <span className="text-xs text-muted-foreground">
                        {match.availability}
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Upcoming Interviews */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="border-0 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Upcoming Interviews</span>
                  <Button variant="outline" size="sm">
                    Schedule New
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingInterviews.length > 0 ? (
                  upcomingInterviews.map((interview) => (
                    <div
                      key={interview.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg"
                    >
                      <div className="space-y-1">
                        <h4 className="font-medium">{interview.candidate}</h4>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{interview.date}</span>
                          <span>{interview.time}</span>
                          <Badge 
                            variant={interview.status === 'confirmed' ? 'default' : 'outline'} 
                            className="text-xs"
                          >
                            {interview.type}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Button size="sm" variant="gradient">
                          {interview.status === 'confirmed' ? 'Join Call' : 'Confirm'}
                        </Button>
                        <Badge 
                          variant={interview.status === 'confirmed' ? 'default' : 'secondary'}
                          className="text-xs text-center"
                        >
                          {interview.status}
                        </Badge>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No upcoming interviews</p>
                    <p className="text-sm">Schedule interviews with potential au pairs!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HostFamilyDashboard;