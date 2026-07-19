import { c360Labs, c360Projects, networkCategories } from '../data/pillars.js';
import { photos, photoAt } from '../data/media.js';

const labPhotos = [
  photos.ubuntuGroup,
  photos.clappingLine,
  photos.youthSmile,
  photos.paimolSigns,
  photos.crowdOrange,
];

const labSections = c360Labs.map((lab, index) => [
  lab.name,
  `${lab.type} lab · ${lab.region}. ${lab.focus}. Members join for mentorship, idea development, personal growth, and optional access to the AI Career Platform.`,
  labPhotos[index % labPhotos.length],
]);

const projectPhotos = [
  photos.schoolyardTruck,
  photos.speakerRacePeace,
  photos.mentorField,
  photos.danceBlueAxes,
  photos.teamBranded,
  photos.walkDirtRoad,
];

const projectSections = c360Projects.map((project, index) => [
  project.title,
  `${project.summary} ${project.items.map((item) => item.name).join(' · ')}.`,
  projectPhotos[index % projectPhotos.length],
]);

const networkPhotos = [
  photos.armsRaisedDrone,
  photos.speakerC360Polo,
  photos.c360ShirtsWalk,
  photos.handsUpField,
  photos.girlsArmsRaised,
  photos.ubuntuGirlsWalk,
  photos.raceForPeaceSign,
  photos.walkPoliceEscort,
];

const networkSections = networkCategories.map((category, index) => [
  category.label,
  `${category.items.length} listed partners and allies. Open the directory below to search by name.`,
  networkPhotos[index % networkPhotos.length],
]);

export const publicPages = {
  '/about': {
    title: 'About C360',
    theme: 'manifesto',
    eyebrow: 'Four Pillars',
    description:
      'C360 Innovation Lab operates under four connected pillars: C360 Labs, the AI Career Platform, the C360 Global Network, and C360 Projects — so people can grow in community, access tailored career support, connect across institutions, and deliver real-world impact.',
    cta: ['Explore Labs', '/labs'],
    stats: [
      ['4', 'Pillars'],
      [`${c360Labs.length}+`, 'Labs'],
      ['Premium', 'Career Platform'],
      ['Global', 'Network'],
      [`${c360Projects.length}`, 'Project Tracks'],
    ],
    sections: [
      [
        'Pillar 1 — C360 Labs',
        'Institutional and community-based labs where people join for mentorship, idea development, and personal growth. Members can also subscribe to the AI Career Platform for in-depth career support. As new labs open — from universities to primary schools to community hubs — they are added to our searchable Labs directory.',
        photos.ubuntuGroup,
      ],
      [
        'Pillar 2 — AI Career Platform',
        'A premium web platform for paid members. Questionnaires assess career needs, personal development, career plans, and SWOT (Strengths, Weaknesses, Opportunities, Techniques). AI-trained agents deliver tailored notifications, age-appropriate growth pathways, discussion rooms, and pen-pal links through a career progress dashboard.',
        photos.mentorField,
      ],
      [
        'Pillar 3 — C360 Global Network',
        'Schools, mentors, industries, businesses, companies, donors, institutions/universities, and research agencies working with us. Each network category is searchable so you can quickly find a mentor, school, company, or partner.',
        photos.armsRaisedDrone,
      ],
      [
        'Pillar 4 — C360 Projects',
        'Programs run through our labs: Agribusiness & Food Systems (including Rural Farmer Support and Revel Roots), C360 Media, Talent Mobility, Sports4Development, the Revolving Fund, and Smart Climate Awareness.',
        photos.culturalDrums,
      ],
    ],
    cards: [
      ['C360 Labs', 'Join a lab near you.', '/labs'],
      ['AI Career Platform', 'Premium tailored support.', '/career'],
      ['Global Network', 'Search our partners.', '/network'],
      ['C360 Projects', 'See what labs deliver.', '/projects'],
    ],
  },

  '/labs': {
    title: 'C360 Labs',
    theme: 'hive',
    eyebrow: 'Pillar 01',
    description:
      'Institutional and community-based labs. Join for mentorship, develop your ideas, grow as an individual — and optionally subscribe to the AI Career Platform for deeper career support. Search the directory as new labs open worldwide.',
    cta: ['Join a Lab', '/register'],
    stats: [
      [`${c360Labs.length}`, 'Listed Labs'],
      ['Institutional', '& Community'],
      ['Mentorship', 'Inside Labs'],
      ['Ideas', 'Developed'],
      ['Career', 'Platform Access'],
    ],
    sections: labSections,
    cards: [
      ['AI Career Platform', 'Premium assessments & agents.', '/career'],
      ['C360 Projects', 'What labs deliver in the field.', '/projects'],
      ['Global Network', 'Mentors & partner schools.', '/network'],
      ['Contact', 'Open or join a lab.', '/contact'],
    ],
    directory: { kind: 'labs', title: 'Lab directory', placeholder: 'Search labs by name, type, or place…' },
  },

  '/career': {
    title: 'AI Career Platform',
    theme: 'blueprint',
    eyebrow: 'Pillar 02 · Premium',
    description:
      'Our paid web platform for in-depth career and personal development support. Members complete questionnaires so we can assess career needs, personal development needs, career plans, and SWOT — then tailor support through AI-trained agents, progress dashboards, discussion rooms, and pen-pal links.',
    cta: ['Member Access', '/learn'],
    stats: [
      ['Paid', 'Members Only'],
      ['SWOT', 'Assessments'],
      ['AI', 'Agents'],
      ['Dashboard', 'Progress'],
      ['Rooms', '& Pen Pals'],
    ],
    sections: [
      [
        'Career & development questionnaires',
        'Members fill structured questionnaires covering career needs, personal development needs, career plans, and SWOT (Strengths, Weaknesses, Opportunities, Techniques) so support can be customized.',
        photoAt(12),
      ],
      [
        'Tailored AI agent notifications',
        'AI-trained agents send notifications suited to each member’s needs and stage — keeping guidance timely and personal.',
        photoAt(13),
      ],
      [
        'Age-appropriate growth dashboard',
        'A career growth progress dashboard places members on pathways appropriate to their age and stage of development.',
        photoAt(14),
      ],
      [
        'Discussion rooms & pen pals',
        'Members are placed in the right discussion rooms and connected to relevant pen pals aligned with their growth path.',
        photoAt(15),
      ],
      [
        'Linked from C360 Labs',
        'Lab members can subscribe to the AI Career Platform for in-depth career support while continuing mentorship and idea development in their lab.',
        photoAt(16),
      ],
      [
        'Premium access',
        'Platform capabilities are available to paid members. Create an account, complete onboarding assessments, and unlock the full career workspace.',
        photoAt(17),
      ],
    ],
    cards: [
      ['Open Platform', 'Paid member workspace.', '/learn'],
      ['Join a Lab', 'Community + mentorship first.', '/labs'],
      ['Register', 'Start your member profile.', '/register'],
      ['Contact', 'Ask about premium access.', '/contact'],
    ],
  },

  '/network': {
    title: 'C360 Global Network',
    theme: 'weave',
    eyebrow: 'Pillar 03',
    description:
      'Schools, mentors, industries, businesses, companies, donors, institutions/universities, and research agencies working with us or as part of us. Expand each category and search quickly by name.',
    cta: ['Partner With Us', '/contact'],
    stats: [
      [`${networkCategories.length}`, 'Categories'],
      ['Schools', '& Mentors'],
      ['Industry', 'Allies'],
      ['Donors', '& Funders'],
      ['Research', 'Agencies'],
    ],
    sections: networkSections,
    cards: [
      ['C360 Labs', 'Where network meets local action.', '/labs'],
      ['Projects', 'Shared delivery with partners.', '/projects'],
      ['Career Platform', 'Mentorship meets premium support.', '/career'],
      ['Contact', 'Join the network.', '/contact'],
    ],
    directory: { kind: 'network', title: 'Network directory', placeholder: 'Search mentors, schools, companies…' },
  },

  '/projects': {
    title: 'C360 Projects',
    theme: 'arena',
    eyebrow: 'Pillar 04',
    description:
      'Projects run by C360 Innovation Labs — from agribusiness and media to talent mobility, sports for development, revolving finance, and climate-smart farming.',
    cta: ['Explore Labs', '/labs'],
    stats: [
      [`${c360Projects.length}`, 'Project Tracks'],
      ['Food', 'Systems'],
      ['Media', '& Voice'],
      ['Talent', 'Mobility'],
      ['Climate', 'Aware'],
    ],
    sections: projectSections,
    cards: [
      ['Agribusiness', 'Farmers, Revel Roots & food systems.', '/projects'],
      ['Talent Mobility', 'Mentored workforce deployment.', '/projects'],
      ['Revolving Fund', 'Capital for lab start-ups.', '/projects'],
      ['Labs', 'Where projects grow.', '/labs'],
    ],
    directory: { kind: 'projects', title: 'Project tracks', placeholder: 'Search projects by name…' },
  },

  '/contact': {
    title: 'Contact Us',
    theme: 'signal',
    eyebrow: 'Start A Conversation',
    description:
      'Reach out to join a lab, inquire about AI Career Platform membership, join the Global Network, partner on a project, or open a new C360 Lab.',
    cta: ['Create Account', '/register'],
    stats: [
      ['Labs', 'Join / Open'],
      ['Career', 'Premium'],
      ['Network', 'Partners'],
      ['Projects', 'Collaborate'],
      ['48h', 'Typical Reply'],
    ],
    sections: [
      [
        'C360 Labs',
        'Ask about joining an existing lab or opening a new institutional or community lab.',
        photoAt(18),
      ],
      [
        'AI Career Platform',
        'Questions about premium membership, assessments, and member access.',
        photoAt(19),
      ],
      [
        'Global Network',
        'Schools, mentors, companies, donors, and research agencies — partner with us.',
        photoAt(20),
      ],
      [
        'C360 Projects',
        'Collaborate on agribusiness, media, talent mobility, sports, revolving fund, or climate initiatives.',
        photoAt(21),
      ],
      [
        'Support',
        'Help with accounts, member access, and platform features.',
        photoAt(22),
      ],
      [
        'Media & Press',
        'Stories about labs, projects, and community change agents.',
        photoAt(23),
      ],
    ],
    cards: [
      ['General', 'hello@c360innovation.org'],
      ['Partnerships', 'partners@c360innovation.org'],
      ['Support', 'help@c360innovation.org'],
      ['Explore Labs', 'Find a lab near you.', '/labs'],
      ['Career Platform', 'Premium member access.', '/career'],
      ['Global Network', 'Browse partners.', '/network'],
    ],
  },

  /* Legacy paths remapped via App redirects: /clubs → /labs, /programs → /career, /partnerships → /network */
  '/resources': {
    title: 'Resources',
    theme: 'stacks',
    eyebrow: 'Across The Pillars',
    description:
      'Guides and materials that support C360 Labs, AI Career Platform members, Global Network partners, and project teams.',
    cta: ['Open Career Platform', '/career'],
    stats: [['Labs', 'Toolkits'], ['Career', 'Guides'], ['Network', 'Briefs'], ['Projects', 'Playbooks']],
    sections: [
      ['Lab facilitation guides', 'Run meetings, mentorship circles, and idea sprints inside C360 Labs.', photoAt(24)],
      ['Career assessment prep', 'Prepare for questionnaires, SWOT, and progress dashboard onboarding.', photoAt(25)],
      ['Network partner briefs', 'How schools, mentors, companies, and donors engage with C360.', photoAt(26)],
      ['Project playbooks', 'Agribusiness, media, talent, sports, revolving fund, and climate tracks.', photoAt(27)],
    ],
    cards: [
      ['Labs', 'Join a lab.', '/labs'],
      ['Career Platform', 'Premium workspace.', '/career'],
      ['Network', 'Find partners.', '/network'],
      ['Projects', 'See delivery tracks.', '/projects'],
    ],
  },
  '/competitions': {
    title: 'Challenges & Showcases',
    theme: 'arena',
    eyebrow: 'Inside Labs & Projects',
    description:
      'Innovation challenges and showcases that emerge from C360 Labs and C360 Projects — practice, pitch, and amplify community solutions.',
    cta: ['View Projects', '/projects'],
    stats: [['Lab', 'Challenges'], ['Project', 'Showcases'], ['Mentor', 'Feedback']],
    sections: [
      ['Lab challenges', 'Problem briefs tackled inside institutional and community labs.', photoAt(28)],
      ['Project showcases', 'Share outcomes from agribusiness, media, talent, sports, and climate work.', photoAt(29)],
      ['Pitch practice', 'Communicate your idea to mentors, partners, and network allies.', photoAt(30)],
    ],
    cards: [
      ['Labs', 'Build with peers.', '/labs'],
      ['Projects', 'Field delivery.', '/projects'],
      ['Career Platform', 'Polish your pathway.', '/career'],
    ],
  },
  '/financial-literacy': {
    title: 'Financial Literacy',
    theme: 'ledger',
    eyebrow: 'Skills For Labs & Ventures',
    description:
      'Money skills that support lab members, revolving-fund applicants, and career platform members building sustainable pathways.',
    cta: ['Career Platform', '/career'],
    stats: [['Budget', 'Skills'], ['Venture', 'Ready'], ['Fund', 'Aware']],
    sections: [
      ['Personal finance', 'Budgeting and saving for learners in labs.', photoAt(31)],
      ['Enterprise finance', 'Pricing and cash flow for lab-spawned start-ups.', photoAt(32)],
      ['Revolving fund readiness', 'Prepare for community empowerment capital.', photoAt(33)],
    ],
    cards: [
      ['Revolving Fund', 'See the project track.', '/projects'],
      ['Labs', 'Grow with mentors.', '/labs'],
      ['Career Platform', 'Personal development plan.', '/career'],
    ],
  },
  '/incubation': {
    title: 'Lab Ventures & Incubation',
    theme: 'kiln',
    eyebrow: 'From Lab Idea To Venture',
    description:
      'Structured support for ideas sprouting from C360 Labs — validation, prototypes, and readiness for the Revolving Fund and network partners.',
    cta: ['Join a Lab', '/labs'],
    stats: [['Lab', 'Born'], ['Mentor', 'Guided'], ['Fund', 'Ready']],
    sections: [
      ['Validate in labs', 'Test assumptions with mentors and community.', photoAt(34)],
      ['Prototype', 'Build simple, testable solutions.', photoAt(35)],
      ['Pitch to network', 'Tell a clear story to partners and funders.', photoAt(36)],
    ],
    cards: [
      ['Projects', 'Revolving Fund track.', '/projects'],
      ['Network', 'Meet partners.', '/network'],
      ['Career Platform', 'Strengthen your plan.', '/career'],
    ],
  },
  '/mentorship': {
    title: 'Mentorship',
    theme: 'guidepath',
    eyebrow: 'Inside Labs & Network',
    description:
      'Mentorship lives inside C360 Labs and across the Global Network — and deepens on the AI Career Platform for paid members.',
    cta: ['Find Mentors', '/network'],
    stats: [['Labs', 'Mentors'], ['Network', 'Experts'], ['Career', 'Agents']],
    sections: [
      ['Lab mentorship', 'Grow ideas and character inside your lab.', photoAt(37)],
      ['Network mentors', 'Search mentors in the Global Network directory.', photoAt(38)],
      ['Career Platform guidance', 'AI agents and tailored pathways for paid members.', photoAt(39)],
    ],
    cards: [
      ['Labs', 'Join for mentorship.', '/labs'],
      ['Network', 'Search mentors.', '/network'],
      ['Career Platform', 'Premium support.', '/career'],
    ],
  },
  '/mentorship-sessions': {
    title: 'Mentorship Sessions',
    theme: 'guidepath',
    eyebrow: 'Prepare & Follow Through',
    description: 'Schedule and prepare mentorship conversations tied to your lab and career pathway.',
    cta: ['Open Dashboard', '/dashboard'],
    stats: [['Focused', 'Agenda'], ['Action', 'Plan'], ['Lab', 'Aligned']],
    sections: [
      ['Upcoming sessions', 'Track mentor conversations.', photoAt(40)],
      ['Preparation', 'Goals and questions before the call.', photoAt(41)],
      ['Follow up', 'Turn advice into deadlines.', photoAt(42)],
    ],
    cards: [
      ['Career Platform', 'Member workspace.', '/career'],
      ['Labs', 'Back to your lab.', '/labs'],
      ['Network', 'Find a mentor.', '/network'],
    ],
  },
  '/research': {
    title: 'Research & Inquiry',
    theme: 'labglass',
    eyebrow: 'Labs · Network · Climate',
    description:
      'Youth-led inquiry across labs and with research agencies in the Global Network — including food systems and climate-smart practice.',
    cta: ['Research Agencies', '/network'],
    stats: [['Labs', 'Inquiry'], ['Network', 'Agencies'], ['Climate', 'Aware']],
    sections: [
      ['Problem research', 'Understand users and root causes in community labs.', photoAt(43)],
      ['Field experimentation', 'Pilots tied to C360 Projects.', photoAt(44)],
      ['Knowledge sharing', 'Document lessons with network allies.', photoAt(45)],
    ],
    cards: [
      ['Network', 'Research agencies.', '/network'],
      ['Projects', 'Climate & food systems.', '/projects'],
      ['Labs', 'Where inquiry starts.', '/labs'],
    ],
  },
  '/profile': {
    title: 'My Profile',
    theme: 'panel',
    eyebrow: 'Your Account',
    description: 'Manage your profile across Labs membership and AI Career Platform progress.',
    cta: ['Go To Dashboard', '/dashboard'],
    stats: [['Lab', 'Membership'], ['Career', 'Progress'], ['Goals', 'Saved']],
    sections: [
      ['Personal details', 'Keep your account information current.', photoAt(46)],
      ['Lab & career interests', 'Choose labs, projects, and development focus.', photoAt(47)],
      ['Progress', 'Activity across labs and the Career Platform.', photoAt(48)],
    ],
    cards: [
      ['Dashboard', 'Member home.', '/dashboard'],
      ['Career Platform', 'Premium workspace.', '/learn'],
      ['Labs', 'Find your lab.', '/labs'],
    ],
  },
  '/my-club': {
    title: 'My Lab',
    theme: 'hive',
    eyebrow: 'Lab Workspace',
    description: 'Track your C360 Lab membership, activities, and project progress.',
    cta: ['Explore Labs', '/labs'],
    stats: [['Active', 'Lab'], ['Projects', 'In Progress'], ['Mentors', 'Near']],
    sections: [
      ['Lab overview', 'Focus, rhythm, and priorities.', photoAt(49)],
      ['Projects', 'Ideas your lab is building.', photoAt(50)],
      ['Members', 'Collaborate with peers.', photoAt(51)],
    ],
    cards: [
      ['All Labs', 'Directory search.', '/labs'],
      ['Career Platform', 'Subscribe for depth.', '/career'],
      ['Projects', 'Lab delivery tracks.', '/projects'],
    ],
    directory: { kind: 'labs', title: 'Lab directory', placeholder: 'Search labs…' },
  },
  '/notifications': {
    title: 'Notifications',
    theme: 'panel',
    eyebrow: 'Updates',
    description:
      'Lab reminders, Career Platform agent alerts, network notices, and project updates — tailored as you grow.',
    cta: ['Open Dashboard', '/dashboard'],
    stats: [['Labs', 'Alerts'], ['Career', 'Agents'], ['Network', 'News']],
    sections: [
      ['Career agents', 'Tailored notifications from the AI Career Platform.', photoAt(52)],
      ['Lab activity', 'Meetings, mentorship, and idea sprints.', photoAt(53)],
      ['Projects & network', 'Partner and project announcements.', photoAt(54)],
    ],
    cards: [
      ['Career Platform', 'Member alerts.', '/career'],
      ['Labs', 'Your lab home.', '/labs'],
      ['Dashboard', 'All updates.', '/dashboard'],
    ],
  },
  '/terms': {
    title: 'Terms of Use',
    theme: 'statute',
    eyebrow: 'Legal',
    description: 'Terms governing C360 Labs, the AI Career Platform, Global Network participation, and related services.',
    cta: ['Back to Home', '/'],
    stats: [['Last Updated', 'July 2026'], ['Effective', 'Immediately']],
    sections: [
      ['Acceptance', 'By using C360 services you agree to these terms.'],
      ['User Accounts', 'Keep your credentials confidential.'],
      ['Labs & Network', 'Participate respectfully in labs and partner spaces.'],
      ['AI Career Platform', 'Premium features are for paid members under membership terms.'],
      ['Acceptable Use', 'Use platforms lawfully and respectfully.'],
      ['Termination', 'Accounts may be suspended for violations.'],
    ],
    cards: [
      ['Account Responsibilities', 'Protect your login and report misuse.'],
      ['Community Guidelines', 'Safe spaces across labs and rooms.'],
      ['Contact', 'help@c360innovation.org'],
    ],
  },
  '/privacy': {
    title: 'Privacy Policy',
    theme: 'statute',
    eyebrow: 'Legal',
    description:
      'How C360 collects and protects data across Labs, Career Platform assessments, network directories, and project engagement.',
    cta: ['Back to Home', '/'],
    stats: [['Last Updated', 'July 2026'], ['Effective', 'Immediately']],
    sections: [
      ['Information We Collect', 'Account details, lab activity, and Career Platform assessment responses.'],
      ['How We Use Data', 'To tailor mentorship, AI agent support, and relevant network connections.'],
      ['Data Security', 'Industry-standard protections for member information.'],
      ['Third Parties', 'We do not sell personal data.'],
      ['Cookies', 'Essential cookies for authentication and analytics.'],
      ['Your Rights', 'Access, update, or delete your data from your account settings.'],
    ],
    cards: [
      ['Data Access', 'Request a copy of your data.'],
      ['Account Deletion', 'Remove your account and associated data.'],
      ['Contact', 'help@c360innovation.org'],
    ],
  },
};

