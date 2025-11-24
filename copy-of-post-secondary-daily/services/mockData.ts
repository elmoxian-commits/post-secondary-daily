import { Article, Region, SourceType } from '../types';

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(yesterday.getDate() - 1);

export const MOCK_ARTICLES: Article[] = [
  // MANITOBA SPOTLIGHT / NEWS
  {
    id: 'mb-1',
    headline: 'University of Manitoba Receives Historic Research Funding Boost',
    url: '#',
    sourceName: 'University of Manitoba',
    sourceType: SourceType.INSTITUTION,
    region: Region.MANITOBA,
    publishedAt: today.toISOString(),
    summary: 'The U of M has secured $15M in federal grants to support climate change research in the Arctic, marking a significant milestone for the Faculty of Science.',
    tags: [
      { id: 't1', label: 'University of Manitoba', type: 'institution' },
      { id: 't2', label: 'Research Funding', type: 'topic' }
    ],
    isSuccessStory: true,
    imageUrl: 'https://picsum.photos/800/400?random=1'
  },
  {
    id: 'mb-2',
    headline: 'RRC Polytech Announces New Digital Media Lab',
    url: '#',
    sourceName: 'RRC Polytech News',
    sourceType: SourceType.INSTITUTION,
    region: Region.MANITOBA,
    publishedAt: today.toISOString(),
    summary: 'A new state-of-the-art facility will open downtown next fall, expanding capacity for the Digital Media Design program by 30%.',
    tags: [
      { id: 't3', label: 'Red River College Polytechnic', type: 'institution' },
      { id: 't4', label: 'Campus Development', type: 'topic' }
    ],
    isSuccessStory: true,
  },
  {
    id: 'mb-3',
    headline: 'UMFA Statement on Latest Bargaining Round',
    url: '#',
    sourceName: 'UMFA',
    sourceType: SourceType.FACULTY_ASSOC,
    region: Region.MANITOBA,
    publishedAt: yesterday.toISOString(),
    summary: 'The University of Manitoba Faculty Association has released a statement expressing concerns over workload distribution in the latest proposal.',
    tags: [
      { id: 't5', label: 'University of Manitoba', type: 'institution' },
      { id: 't6', label: 'Labour Relations', type: 'topic' },
      { id: 't7', label: 'Bargaining', type: 'topic' }
    ]
  },
  {
    id: 'mb-4',
    headline: 'Tuition Hikes Protested at Legislature',
    url: '#',
    sourceName: 'CBC Manitoba',
    sourceType: SourceType.MAINSTREAM_MEDIA,
    region: Region.MANITOBA,
    publishedAt: yesterday.toISOString(),
    summary: 'Students from three major Manitoba universities gathered to protest the proposed 3.5% tuition increase for international students.',
    tags: [
      { id: 't8', label: 'Tuition & Fees', type: 'topic' },
      { id: 't9', label: 'Student Action', type: 'topic' }
    ]
  },

  // CANADA
  {
    id: 'can-1',
    headline: 'One Thought to Start Your Day: The Blue-Ribbon Panel Fallout',
    url: '#',
    sourceName: 'HESA (Alex Usher)',
    sourceType: SourceType.SECTOR_BLOG,
    region: Region.CANADA,
    publishedAt: today.toISOString(),
    summary: 'Analyzing the long-term implications of the Ontario government\'s response to the expert panel on financial sustainability.',
    tags: [
      { id: 't10', label: 'Policy', type: 'topic' },
      { id: 't11', label: 'Finance', type: 'topic' }
    ]
  },
  {
    id: 'can-2',
    headline: 'Federal Cap on International Student Permits: Updates',
    url: '#',
    sourceName: 'Globe and Mail',
    sourceType: SourceType.MAINSTREAM_MEDIA,
    region: Region.CANADA,
    publishedAt: yesterday.toISOString(),
    summary: 'Immigration officials clarify new exemption rules for masters and doctoral students under the new permit cap.',
    tags: [
      { id: 't12', label: 'International Students', type: 'topic' },
      { id: 't13', label: 'Federal Policy', type: 'topic' }
    ]
  },
  {
    id: 'can-3',
    headline: 'McGill Law Professors Strike Continues',
    url: '#',
    sourceName: 'CAUT / ACPPU',
    sourceType: SourceType.FACULTY_ASSOC,
    region: Region.CANADA,
    publishedAt: yesterday.toISOString(),
    summary: 'The Association of McGill Professors of Law (AMPL) remains on the picket line as negotiations stall over union recognition.',
    tags: [
      { id: 't14', label: 'Labour Relations', type: 'topic' },
      { id: 't15', label: 'Strike', type: 'topic' }
    ]
  },

  // INTERNATIONAL
  {
    id: 'intl-1',
    headline: 'US FAFSA Delays Cause Chaos for Fall Enrolment',
    url: '#',
    sourceName: 'Chronicle of Higher Ed',
    sourceType: SourceType.MAINSTREAM_MEDIA,
    region: Region.INTERNATIONAL,
    publishedAt: yesterday.toISOString(),
    summary: 'Technical glitches in the new federal student aid form are delaying financial aid packages for millions of students.',
    tags: [
      { id: 't16', label: 'Student Aid', type: 'topic' },
      { id: 't17', label: 'USA', type: 'topic' }
    ]
  },
  {
    id: 'intl-2',
    headline: 'UK Universities Face Financial Crunch Amid Visa Restrictions',
    url: '#',
    sourceName: 'Times Higher Education',
    sourceType: SourceType.MAINSTREAM_MEDIA,
    region: Region.INTERNATIONAL,
    publishedAt: yesterday.toISOString(),
    summary: 'A sharp decline in international applications is forcing several UK institutions to announce redundancy schemes.',
    tags: [
      { id: 't18', label: 'Global Ed', type: 'topic' },
      { id: 't19', label: 'Funding', type: 'topic' }
    ]
  }
];

export const getArticles = async (): Promise<Article[]> => {
  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => resolve(MOCK_ARTICLES), 600);
  });
};