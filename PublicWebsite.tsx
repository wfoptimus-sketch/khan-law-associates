import React, { useState } from 'react';
import { useChamber } from '../../context/ChamberContext';
import { Navbar } from '../common/Navbar';
import { Hero } from './Hero';
import { About } from './About';
import { MissionVisionValues } from './MissionVisionValues';
import { PracticeAreas } from './PracticeAreas';
import { Team } from './Team';
import { Experience } from './Experience';
import { Expertise } from './Expertise';
import { Services } from './Services';
import { WhyChooseUs } from './WhyChooseUs';
import { Approach } from './Approach';
import { BlogSection } from './BlogSection';
import { FaqSection } from './FaqSection';
import { TestimonialsSection } from './TestimonialsSection';
import { ConsultationSection } from './ConsultationSection';
import { ContactSection } from './ContactSection';
import { Footer } from './Footer';
import { AdvocateDetailModal } from './AdvocateDetailModal';
import { PracticeAreaModal } from './PracticeAreaModal';
import { ArticleReaderModal } from './ArticleReaderModal';
import { ConsultationModal } from './ConsultationModal';
import { LegalPageModal } from './LegalPageModal';
import { AdvocateProfile, PracticeArea, LegalArticle, LegalPagesContent } from '../../types';

export const PublicWebsite: React.FC = () => {
  const { 
    sectionVisibility, 
    selectedAdvocate, 
    setSelectedAdvocate,
    selectedPracticeArea,
    setSelectedPracticeArea,
    selectedArticle,
    setSelectedArticle,
    isConsultationModalOpen,
    setIsConsultationModalOpen,
    consultationDefaultMatter,
    setConsultationDefaultMatter
  } = useChamber();

  const [activeLegalModalKey, setActiveLegalModalKey] = useState<keyof LegalPagesContent | null>(null);

  const handleOpenConsultation = (matter: string = '') => {
    setConsultationDefaultMatter(matter);
    setIsConsultationModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-[#1A1A1A] flex flex-col font-sans">
      
      {/* Sticky Header & Navigation */}
      <Navbar 
        onOpenConsultation={() => handleOpenConsultation('')}
      />

      <main className="flex-grow">
        {/* Hero Section */}
        {sectionVisibility.hero && (
          <Hero 
            onOpenConsultation={() => handleOpenConsultation('')}
          />
        )}

        {/* About Section */}
        {sectionVisibility.about && (
          <About 
            onOpenConsultation={() => handleOpenConsultation('')}
          />
        )}

        {/* Mission, Vision & Values */}
        {(sectionVisibility.missionVision || sectionVisibility.values) && (
          <MissionVisionValues />
        )}

        {/* Practice Areas */}
        {sectionVisibility.practiceAreas && (
          <PracticeAreas 
            onSelectArea={(area) => setSelectedPracticeArea(area)}
            onConsultationWithMatter={(matter) => handleOpenConsultation(matter)}
          />
        )}

        {/* Why Choose Us */}
        {sectionVisibility.whyChooseUs && (
          <WhyChooseUs />
        )}

        {/* Experience & Timeline */}
        {sectionVisibility.experience && (
          <Experience />
        )}

        {/* Legal Expertise */}
        {sectionVisibility.expertise && (
          <Expertise />
        )}

        {/* Meet Our Legal Team */}
        {sectionVisibility.team && (
          <Team 
            onSelectAdvocate={(adv) => setSelectedAdvocate(adv)}
          />
        )}

        {/* How We Handle Your Legal Matter / Approach */}
        {sectionVisibility.approach && (
          <Approach />
        )}

        {/* Legal Services */}
        {sectionVisibility.services && (
          <Services 
            onOpenConsultationWithService={(svc) => handleOpenConsultation(svc)}
          />
        )}

        {/* Legal Insights / Blog */}
        {sectionVisibility.legalInsights && (
          <BlogSection 
            onSelectArticle={(art) => setSelectedArticle(art)}
          />
        )}

        {/* FAQs */}
        {sectionVisibility.faqs && (
          <FaqSection />
        )}

        {/* Testimonials */}
        {sectionVisibility.testimonials && (
          <TestimonialsSection />
        )}

        {/* In-page Consultation Section */}
        {sectionVisibility.consultationCta && (
          <ConsultationSection 
            defaultMatter={consultationDefaultMatter}
          />
        )}

        {/* Contact Section */}
        {sectionVisibility.contact && (
          <ContactSection />
        )}
      </main>

      {/* Footer */}
      <Footer 
        onOpenLegalModal={(key) => setActiveLegalModalKey(key)}
        onOpenConsultation={() => handleOpenConsultation('')}
      />

      {/* Modal Views */}
      <AdvocateDetailModal
        advocate={selectedAdvocate}
        onClose={() => setSelectedAdvocate(null)}
        onConsultationWithAdvocate={(name) => handleOpenConsultation(`Consultation with Advocate ${name}`)}
      />

      <PracticeAreaModal
        area={selectedPracticeArea}
        onClose={() => setSelectedPracticeArea(null)}
        onRequestConsultation={(matter) => handleOpenConsultation(matter)}
      />

      <ArticleReaderModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onRequestConsultation={(topic) => handleOpenConsultation(topic)}
      />

      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        initialMatter={consultationDefaultMatter}
      />

      <LegalPageModal
        pageKey={activeLegalModalKey}
        onClose={() => setActiveLegalModalKey(null)}
      />

    </div>
  );
};
