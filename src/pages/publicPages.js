import { c360Labs, c360Projects, networkCategories } from '../data/pillars.js';
import { photos, photoAt } from '../data/media.js';
import { c360Team } from '../data/team.js';

const labPhotos = [
  photos.ubuntuGroup,
  photos.clappingLine,
  photos.youthSmile,
  photos.paimolSigns,
  photos.crowdOrange,
];

const labSections = c360Labs.map((lab, index) => [
  lab.name,
  `${lab.type} lab · ${lab.region}. ${lab.focus}. Members join for mentorship, idea development, personal growth, and optional access to the Career Engine.`,
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
  `${project.summary} ${project.items.map((item) => item.body).join(' ')}`,
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
    title: 'About Us',
    theme: 'manifesto',
    eyebrow: 'Four Pillars',
    description:
      '360-degree career support that connects discovery to action — through labs, the Career Engine, a global network, and projects that turn ideas into opportunity.',
    intro: {
      eyebrow: 'About Us',
      title: 'Uganda’s career gateway — where ideas become opportunity.',
      summary:
        'C360 Innovation Lab is Uganda’s career gateway — where ideas become opportunity. We work inside schools, institutions, and communities to help young people discover who they can become and give them a real path to get there.',
      more: [
        'At C360, a young person doesn’t just learn about a career — they join a lab, generate an idea, and watch that idea grow: into a funded pilot, a community project, a job, or a global opportunity.',
        'We call it 360-degree career support because we close the loop that most programmes leave open. Career guidance without a next step is just information. We connect discovery to action — pairing AI-powered career intelligence with real human mentorship, hands-on innovation labs, a revolving fund to prototype ideas, and a global network ready to hire, fund, or partner with what our members build. We complement Uganda’s current competency-based curriculum.',
      ],
      tagline: 'This is where classroom ends and career begins.',
    },
    cta: ['Explore Labs', '/labs'],
    stats: [
      ['Labs', 'Mentorship'],
      ['Career Engine', 'AI + Mentors'],
      ['Global', 'Network'],
      ['Projects', 'Impact'],
    ],
    sections: [
      [
        'C360 Labs',
        'Institutional and community-based labs where people join for mentorship, idea development, and personal growth. Members can also subscribe to the Career Engine for in-depth career support. As new labs open — from universities to primary schools to community hubs — they are added to our searchable Labs directory.',
        photos.ubuntuGroup,
      ],
      [
        'C360 Career Engine',
        'Your career pathway — mapped by AI, walked with a mentor. The C360 Career Engine starts with a guided discovery profile that maps your strengths, interests, and Uganda’s real labour market into 3–5 personalised career pathways. But a recommendation isn’t a relationship — so every pathway connects you to a real person: a vetted mentor in Uganda, the UK, or Europe who has walked the path you’re considering. AI tells you what’s possible. Mentorship helps you actually get there. Together, they turn a career quiz into a career — with skill-building resources matched to your gaps, one-on-one sessions with working professionals, and a portfolio that grows every time you complete a step. This is career guidance that doesn’t stop at advice — every pathway comes with clear next steps, visible progress, and connections into labs, the Global Network, and projects when you’re ready to turn interest into experience.',
        photos.mentorField,
      ],
      [
        'C360 Global Network',
        'Schools, mentors, industries, businesses, companies, donors, institutions/universities, and research agencies working with us. Each network category is searchable so you can quickly find a mentor, school, company, or partner.',
        photos.armsRaisedDrone,
      ],
      [
        'Projects',
        'Where ideas become impact. Every idea born in a C360 Lab needs somewhere to grow. Our Projects are that ground — organisation-led community interventions where prototypes get tested, funded, and scaled into real change. From climate-smart farms to global workforce pipelines, this is C360 turning youth ideas into community solutions.',
        photos.culturalDrums,
      ],
    ],
    cards: [
      ['C360 Labs', 'Join a lab near you.', '/labs'],
      ['C360 Career Engine', 'AI pathways + real mentors.', '/career'],
      ['Global Network', 'Search our partners.', '/network'],
      ['Projects', 'Where ideas become impact.', '/projects'],
    ],
    team: c360Team,
  },

  '/labs': {
    title: 'C360 Labs',
    theme: 'hive',
    eyebrow: 'Pillar 01',
    description:
      'Institutional and community-based labs. Join for mentorship, develop your ideas, grow as an individual — and optionally subscribe to the Career Engine for deeper career support. Search the directory as new labs open worldwide.',
    cta: ['Join a Lab', '/register'],
    stats: [
      [`${c360Labs.length}`, 'Labs'],
      ['Institutional', '& Community'],
      ['Mentorship', 'Inside Labs'],
      ['Ideas', 'Developed'],
      ['Career', 'Engine Access'],
    ],
    sections: labSections,
    cards: [
      ['Career Engine', 'Premium assessments & agents.', '/career'],
      ['C360 Projects', 'What labs deliver in the field.', '/projects'],
      ['Global Network', 'Mentors & partner schools.', '/network'],
      ['Contact', 'Open or join a lab.', '/contact'],
    ],
    directory: { kind: 'labs', title: 'Lab directory', placeholder: 'Search labs by name, type, or place…' },
  },

  '/career': {
    title: 'Career Engine',
    theme: 'blueprint',
    eyebrow: 'Pillar 02 · C360 Career Engine',
    description:
      'Your career pathway — mapped by AI, walked with a mentor.',
    cta: ['Start Your Pathway', '/learn'],
    stats: [
      ['3–5', 'Pathways'],
      ['AI', 'Discovery'],
      ['Real', 'Mentors'],
      ['Skills', '& Portfolio'],
      ['Guidance', 'That Acts'],
    ],
    sections: [
      [
        'Guided discovery profile',
        'The C360 Career Engine starts with a guided discovery profile that maps your strengths, interests, and Uganda’s real labour market into 3–5 personalised career pathways.',
        photoAt(12),
      ],
      [
        'A mentor on every pathway',
        'But a recommendation isn’t a relationship — so every pathway connects you to a real person: a vetted mentor in Uganda, the UK, or Europe who has walked the path you’re considering.',
        photos.mentorField,
      ],
      [
        'AI + mentorship together',
        'AI tells you what’s possible. Mentorship helps you actually get there. Together, they turn a career quiz into a career — with skill-building resources matched to your gaps, one-on-one sessions with working professionals, and a portfolio that grows every time you complete a step.',
        photoAt(13),
      ],
      [
        'Guidance that doesn’t stop at advice',
        'This is career guidance that doesn’t stop at advice. Every pathway comes with clear next steps — skills to build, mentor sessions to book, and milestones that grow a portfolio others can see. When you’re ready to go further, your lab, our Global Network, and C360 Projects are there to turn interest into real experience. Your progress stays visible, your pathway evolves as you learn, and the goal isn’t a list of options on paper — it’s forward motion toward a career you’re actively building.',
        photoAt(14),
      ],
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
      ['Career Engine', 'Mentorship meets premium support.', '/career'],
      ['Contact', 'Join the network.', '/contact'],
    ],
    directory: { kind: 'network', title: 'Browse the network', placeholder: 'Search mentors, schools, companies…' },
  },

  '/projects': {
    title: 'Projects',
    theme: 'arena',
    sectionHeader: 'title',
    eyebrow: 'Pillar 04 · Projects',
    description:
      'Where ideas become impact. Every idea born in a C360 Lab needs somewhere to grow. Our Projects are that ground — organisation-led community interventions where prototypes get tested, funded, and scaled into real change. From climate-smart farms to global workforce pipelines, this is C360 turning youth ideas into community solutions.',
    cta: ['Explore Labs', '/labs'],
    stats: [
      [`${c360Projects.length}`, 'Project', 'Tracks'],
      ['Climate', 'Smart Farms'],
      ['REVEL', 'Roots'],
      ['Sport', '4Development'],
      ['Fund', '& Media'],
    ],
    sections: projectSections,
    cards: [
      ['Smart Climate Farming', 'Growing resilience, one farm at a time.', '/projects'],
      ['REVEL Roots Uganda', 'Human, ecological value chains.', '/projects'],
      ['Sports4Development', 'Unity, peace, and development.', '/projects'],
      ['Community Revolving Fund', 'Backing ideas worth believing in.', '/projects'],
    ],
    directory: { kind: 'projects', title: 'Project tracks', placeholder: 'Search projects by name…' },
  },

  '/contact': {
    title: 'Contact Us',
    theme: 'signal',
    eyebrow: 'Start A Conversation',
    description:
      'Reach out to join a lab, inquire about Career Engine membership, join the Global Network, partner on a project, or open a new C360 Lab.',
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
        'Career Engine',
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
      ['Career Engine', 'Premium member access.', '/career'],
      ['Global Network', 'Browse partners.', '/network'],
    ],
  },

  /* Legacy paths remapped via App redirects: /clubs → /labs, /programs → /career, /partnerships → /network */
  '/resources': {
    title: 'Resources',
    theme: 'stacks',
    eyebrow: 'Across The Pillars',
    description:
      'Guides and materials that support C360 Labs, Career Engine members, Global Network partners, and project teams.',
    cta: ['Open Career Engine', '/career'],
    stats: [['Labs', 'Toolkits'], ['Career', 'Guides'], ['Network', 'Briefs'], ['Projects', 'Playbooks']],
    sections: [
      ['Lab facilitation guides', 'Run meetings, mentorship circles, and idea sprints inside C360 Labs.', photoAt(24)],
      ['Career assessment prep', 'Prepare for questionnaires, SWOT, and progress dashboard onboarding.', photoAt(25)],
      ['Network partner briefs', 'How schools, mentors, companies, and donors engage with C360.', photoAt(26)],
      ['Project playbooks', 'Agribusiness, media, talent, sports, revolving fund, and climate tracks.', photoAt(27)],
    ],
    cards: [
      ['Labs', 'Join a lab.', '/labs'],
      ['Career Engine', 'Premium workspace.', '/career'],
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
      ['Career Engine', 'Polish your pathway.', '/career'],
    ],
  },
  '/financial-literacy': {
    title: 'Financial Literacy',
    theme: 'ledger',
    eyebrow: 'Skills For Labs & Ventures',
    description:
      'Money skills that support lab members, revolving-fund applicants, and Career Engine members building sustainable pathways.',
    cta: ['Career Engine', '/career'],
    stats: [['Budget', 'Skills'], ['Venture', 'Ready'], ['Fund', 'Aware']],
    sections: [
      ['Personal finance', 'Budgeting and saving for learners in labs.', photoAt(31)],
      ['Enterprise finance', 'Pricing and cash flow for lab-spawned start-ups.', photoAt(32)],
      ['Revolving fund readiness', 'Prepare for community empowerment capital.', photoAt(33)],
    ],
    cards: [
      ['Revolving Fund', 'See the project track.', '/projects'],
      ['Labs', 'Grow with mentors.', '/labs'],
      ['Career Engine', 'Personal development plan.', '/career'],
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
      ['Career Engine', 'Strengthen your plan.', '/career'],
    ],
  },
  '/mentorship': {
    title: 'Mentorship',
    theme: 'guidepath',
    eyebrow: 'Inside Labs & Network',
    description:
      'Mentorship lives inside C360 Labs and across the Global Network — and deepens on the Career Engine for paid members.',
    cta: ['Find Mentors', '/network'],
    stats: [['Labs', 'Mentors'], ['Network', 'Experts'], ['Career', 'Agents']],
    sections: [
      ['Lab mentorship', 'Grow ideas and character inside your lab.', photoAt(37)],
      ['Network mentors', 'Search mentors in the Global Network directory.', photoAt(38)],
      ['Career Engine guidance', 'AI agents and tailored pathways for paid members.', photoAt(39)],
    ],
    cards: [
      ['Labs', 'Join for mentorship.', '/labs'],
      ['Network', 'Search mentors.', '/network'],
      ['Career Engine', 'Premium support.', '/career'],
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
      ['Career Engine', 'Member workspace.', '/career'],
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
    description: 'Manage your profile across Labs membership and Career Engine progress.',
    cta: ['Go To Dashboard', '/dashboard'],
    stats: [['Lab', 'Membership'], ['Career', 'Progress'], ['Goals', 'Saved']],
    sections: [
      ['Personal details', 'Keep your account information current.', photoAt(46)],
      ['Lab & career interests', 'Choose labs, projects, and development focus.', photoAt(47)],
      ['Progress', 'Activity across labs and the Career Engine.', photoAt(48)],
    ],
    cards: [
      ['Dashboard', 'Member home.', '/dashboard'],
      ['Career Engine', 'Premium workspace.', '/learn'],
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
      ['Career Engine', 'Subscribe for depth.', '/career'],
      ['Projects', 'Lab delivery tracks.', '/projects'],
    ],
    directory: { kind: 'labs', title: 'Lab directory', placeholder: 'Search labs…' },
  },
  '/notifications': {
    title: 'Notifications',
    theme: 'panel',
    eyebrow: 'Updates',
    description:
      'Lab reminders, Career Engine agent alerts, network notices, and project updates — tailored as you grow.',
    cta: ['Open Dashboard', '/dashboard'],
    stats: [['Labs', 'Alerts'], ['Career', 'Agents'], ['Network', 'News']],
    sections: [
      ['Career agents', 'Tailored notifications from the Career Engine.', photoAt(52)],
      ['Lab activity', 'Meetings, mentorship, and idea sprints.', photoAt(53)],
      ['Projects & network', 'Partner and project announcements.', photoAt(54)],
    ],
    cards: [
      ['Career Engine', 'Member alerts.', '/career'],
      ['Labs', 'Your lab home.', '/labs'],
      ['Dashboard', 'All updates.', '/dashboard'],
    ],
  },
  '/terms': {
    title: 'Terms of Use',
    theme: 'statute',
    eyebrow: 'Legal',
    description: 'Terms governing C360 Labs, the Career Engine, Global Network participation, and related services.',
    cta: ['Back to Home', '/'],
    stats: [['Last Updated', 'July 2026'], ['Effective', 'Immediately']],
    sections: [
      ['Acceptance', 'By using C360 services you agree to these terms.'],
      ['User Accounts', 'Keep your credentials confidential.'],
      ['Labs & Network', 'Participate respectfully in labs and partner spaces.'],
      ['Career Engine', 'Premium features are for paid members under membership terms.'],
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
      'How C360 collects and protects data across Labs, Career Engine assessments, network directories, and project engagement.',
    cta: ['Back to Home', '/'],
    stats: [['Last Updated', 'July 2026'], ['Effective', 'Immediately']],
    sections: [
      ['Information We Collect', 'Account details, lab activity, and Career Engine assessment responses.'],
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

