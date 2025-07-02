import React from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { MessageCenter } from '@/components/messaging/MessageCenter';

const MessagesPage: React.FC = () => {
  return (
    <DashboardLayout>
      <div className="h-full">
        <MessageCenter />
      </div>
    </DashboardLayout>
  );
};

export default MessagesPage;