import React from 'react';
import { useChamber } from '../../context/ChamberContext';
import { AdminLayout } from './AdminLayout';
import { AdminLogin } from './AdminLogin';
import { DashboardOverview } from './DashboardOverview';
import { ContactManager } from './ContactManager';
import { HomepageManager } from './HomepageManager';
import { PracticeAreaManager } from './PracticeAreaManager';
import { TeamManager } from './TeamManager';
import { ExperienceManager } from './ExperienceManager';
import { ExpertiseServicesManager } from './ExpertiseServicesManager';
import { BlogManager } from './BlogManager';
import { FaqManager } from './FaqManager';
import { TestimonialsManager } from './TestimonialsManager';
import { ConsultationRequestsManager } from './ConsultationRequestsManager';
import { MediaLibraryManager } from './MediaLibraryManager';
import { SeoManager } from './SeoManager';
import { SettingsManager } from './SettingsManager';
import { RevisionHistoryManager } from './RevisionHistoryManager';
import { UserManager } from './UserManager';

export const AdminPortal: React.FC = () => {
  const { currentUser, activeTab } = useChamber();

  if (!currentUser) {
    return <AdminLogin />;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'homepage':
        return <HomepageManager />;
      case 'contact':
        return <ContactManager />;
      case 'practice-areas':
        return <PracticeAreaManager />;
      case 'team':
        return <TeamManager />;
      case 'experience':
        return <ExperienceManager />;
      case 'expertise-services':
        return <ExpertiseServicesManager />;
      case 'blog':
        return <BlogManager />;
      case 'consultations':
        return <ConsultationRequestsManager />;
      case 'faqs':
        return <FaqManager />;
      case 'testimonials':
        return <TestimonialsManager />;
      case 'media':
        return <MediaLibraryManager />;
      case 'seo':
        return <SeoManager />;
      case 'settings':
        return <SettingsManager />;
      case 'revisions':
        return <RevisionHistoryManager />;
      case 'users':
        return <UserManager />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <AdminLayout>
      {renderTabContent()}
    </AdminLayout>
  );
};
