export interface Job {
  _id: string;
  title: string;
  slug: { current: string } | string;
  company: string;
  companyLogo?: string;
  location: string;
  opportunityType: 'Full-Time' | 'Internship' | string;
  experienceLevel: 'Fresher' | '1-3 YOE' | '3+ YOE' | string;
  eligibleBatches: string[];
  qualification: string[];
  domain: 'IT/Software' | 'Non-IT' | 'Core' | 'Design' | 'Product' | string;
  workMode: 'Remote' | 'Hybrid' | 'Onsite' | string;
  applyUrl: string;
  verifiedAt: string;
  keyDetails?: string[];
  description?: any;
  salary?: string;
}

export interface ResourceItem {
  id: string;
  title: string;
  slug: string;
  category: 'Interview Roadmaps' | 'PDF Cheatsheets' | 'Resume Templates' | string;
  description: string;
  file_url: string;
  file_size: string;
  format: 'PDF' | 'DOCX' | 'ZIP' | string;
  download_count?: number;
  tags: string[];
}

export interface SearchIntent {
  batch: string[];
  domain: string[];
  location: string[];
  company: string[];
  qualification: string[];
  experience: string;
  opportunityType?: string;
  keywords: string[];
}

export interface FilterState {
  opportunityType: string;
  batch: string;
  experience: string;
  domain: string;
  workMode: string;
  location: string;
  qualification: string;
  searchQuery: string;
}
