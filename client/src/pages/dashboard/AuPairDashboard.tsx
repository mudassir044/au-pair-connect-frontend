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
  Clock
} from 'lucide-react';

const AuPairDashboard: React.FC = () => {
  const { user } = useAuth();

  const stats = [
    {
      title: 'Profile Views',
      value: '127',
      icon: Users,
      change: '+12%',
      changeType: 'positive' as const,
    },
    {
      title: 'Messages',
      value: '8',
      icon: MessageSquare,
      change: '+3',
      changeType: 'positive' as const,
    },
    {
      title: 'Interviews Scheduled',
      value: '3',
      icon: Calendar,
      change: '+1',
      changeType: 'positive' as const,
    },
    {
      title: 'Documents Verified',
      value: '4/5',
      icon: FileText,
      change: 'Pending',
      changeType: 'neutral' as const,
    },
  ];

  const recentMatches = [
    {
      id: 1,
      familyName: 'The Johnson Family',
      location: 'Boston, MA',
      children: 2,
      rating: 4.9,
      matchScore: 95,
      lastActive: '2 hours ago',
    },
    {
      id: 2,
      familyName: 'The Garcia Family',
      location: 'Austin, TX',
      children: 1,
      rating: 4.8,
      matchScore: 92,
      lastActive: '1 day ago',
    },
    {
      id: 3,
      familyName: 'The Chen Family',
      location: 'Seattle, WA',
      children: 3,
      rating: 4.7,
      matchScore: 89,
      lastActive: '3 days ago',
    },
  ];

  const upcomingInterviews = [
    {
      id: 1,
      family: 'The Johnson Family',
      date: 'Today',
      time: '3:00 PM',
      type: 'Video Call',
    },
    {
      id: 2,
      family: 'The Garcia Family',
      date: 'Tomorrow',
      time: '10:00 AM',
      type: 'Phone Call',
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
                Here's what's happening with your au pair journey today.
              </p>
            </div>
            <Button variant="gradient" size="lg">
              Complete Profile
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
          {/* Recent Matches */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="border-0 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Top Matches</span>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentMatches.map((match) => (
                  <div
                    key={match.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">{match.familyName}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {match.matchScore}% match
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {match.location}
                        </span>
                        <span>{match.children} children</span>
                        <span className="flex items-center">
                          <Star className="h-3 w-3 mr-1 fill-current text-yellow-400" />
                          {match.rating}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <Button size="sm" variant="outline">
                        Message
                      </Button>
                      <span className="text-xs text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {match.lastActive}
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
                        <h4 className="font-medium">{interview.family}</h4>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{interview.date}</span>
                          <span>{interview.time}</span>
                          <Badge variant="outline" className="text-xs">
                            {interview.type}
                          </Badge>
                        </div>
                      </div>
                      <Button size="sm" variant="gradient">
                        Join Call
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No upcoming interviews</p>
                    <p className="text-sm">Schedule interviews with interested families!</p>
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

export default AuPairDashboard;