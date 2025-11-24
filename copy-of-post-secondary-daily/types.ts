export enum Region {
  MANITOBA = 'Manitoba',
  CANADA = 'Canada',
  INTERNATIONAL = 'International',
}

export enum SourceType {
  INSTITUTION = 'Institution Newsroom',
  FACULTY_ASSOC = 'Faculty Association',
  MAINSTREAM_MEDIA = 'Mainstream Media',
  SECTOR_BLOG = 'Sector Commentary',
}

export interface Tag {
  id: string;
  label: string;
  type: 'institution' | 'topic' | 'general';
}

export interface Article {
  id: string;
  headline: string;
  url: string;
  sourceName: string;
  sourceType: SourceType;
  region: Region;
  publishedAt: string; // ISO Date string
  summary: string;
  tags: Tag[];
  imageUrl?: string; // Optional placeholder
  isSuccessStory?: boolean; // For spotlight
}

export interface FilterState {
  searchQuery: string;
  region: Region | 'All';
  onlyManitoba: boolean;
  onlyFacultyAssoc: boolean;
  onlyCommentary: boolean;
}