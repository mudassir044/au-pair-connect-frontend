import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-gradient-primary"></div>
              <span className="text-xl font-bold">AuPairConnect</span>
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              Connecting families with trusted au pairs worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/how-it-works" className="text-muted-foreground hover:text-foreground">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-muted-foreground hover:text-foreground">
                  Sign Up
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-muted-foreground hover:text-foreground">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* For Users */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Get Started</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-muted-foreground">Au Pairs</span>
              </li>
              <li>
                <span className="text-muted-foreground">Host Families</span>
              </li>
              <li>
                <span className="text-muted-foreground">Success Stories</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Connect</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-muted-foreground">hello@aupairconnect.com</span>
              </li>
              <li>
                <span className="text-muted-foreground">+1 (555) 123-4567</span>
              </li>
              <li>
                <span className="text-muted-foreground">Support Center</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2024 AuPairConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};