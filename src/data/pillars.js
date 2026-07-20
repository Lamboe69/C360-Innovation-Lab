/** C360 operates under four pillars — shared content for nav, pages, and directories. */

export const pillarNavItems = [
  ['Home', '/'],
  ['About', '/about'],
  ['Labs', '/labs'],
  ['Career Engine', '/career'],
  ['Network', '/network'],
  ['Projects', '/projects'],
  ['Contact', '/contact'],
];

/** Institutional & community labs (extend as new labs open). */
export const c360Labs = [
  { name: 'Makerere University Lab', type: 'Institutional', region: 'Kampala, Uganda', focus: 'University innovation, mentorship & research' },
  { name: 'St. Joseph College–Layibi Lab', type: 'Institutional', region: 'Gulu, Uganda', focus: 'Secondary school makers & peer learning' },
  { name: 'St. Michael Primary School Lab', type: 'Institutional', region: 'Uganda', focus: 'Age-appropriate creativity & discovery' },
  { name: 'Greater Paimol Community Lab', type: 'Community', region: 'Paimol, Uganda', focus: 'Community enterprise & local solutions' },
  { name: 'Gulu Community Lab', type: 'Community', region: 'Gulu, Uganda', focus: 'Youth skills, clubs & civic projects' },
];

/** Global network directories — searchable within each category. */
export const networkCategories = [
  {
    id: 'schools',
    label: 'Schools',
    items: [
      { name: 'St. Joseph College–Layibi', detail: 'Secondary · Partner school lab host' },
      { name: 'St. Michael Primary School', detail: 'Primary · Early innovation pathway' },
      { name: 'Gulu Secondary School Network', detail: 'Regional secondary partners' },
    ],
  },
  {
    id: 'mentors',
    label: 'Mentors',
    items: [
      { name: 'Career & Skills Mentors', detail: 'Guidance on pathways, portfolios & soft skills' },
      { name: 'Enterprise Mentors', detail: 'Business models, pitching & customer discovery' },
      { name: 'Research Mentors', detail: 'Methods, prototyping & evidence building' },
      { name: 'Creative & Media Mentors', detail: 'Storytelling, design & community voice' },
    ],
  },
  {
    id: 'industries',
    label: 'Industries',
    items: [
      { name: 'Agribusiness & Food Systems', detail: 'Farming, value chains & rural enterprise' },
      { name: 'Education & EdTech', detail: 'Learning tools & school partnerships' },
      { name: 'Creative & Media', detail: 'Storytelling for change' },
      { name: 'Climate & Environment', detail: 'Smart farming & conservation' },
    ],
  },
  {
    id: 'businesses',
    label: 'Businesses',
    items: [
      { name: 'Lab-spawned startups', detail: 'Ventures incubated inside C360 Labs' },
      { name: 'Community micro-enterprises', detail: 'Street business & local trade support' },
      { name: 'Social enterprises', detail: 'Mission-driven partners' },
    ],
  },
  {
    id: 'companies',
    label: 'Companies',
    items: [
      { name: 'Employer partners', detail: 'Internships, placements & talent briefs' },
      { name: 'Technology collaborators', detail: 'Tools, platforms & skills sponsorship' },
      { name: 'Service firms', detail: 'Professional services aligned to youth pathways' },
    ],
  },
  {
    id: 'donors',
    label: 'Donors',
    items: [
      { name: 'Community empowerment funders', detail: 'Revolving fund & lab support' },
      { name: 'Program sponsors', detail: 'Fellowships, media & sports initiatives' },
      { name: 'Scholarship partners', detail: 'Access for learners across labs' },
    ],
  },
  {
    id: 'institutions',
    label: 'Institutions / Universities',
    items: [
      { name: 'Makerere University', detail: 'University Lab host & research ally' },
      { name: 'Regional tertiary partners', detail: 'Colleges & training institutes' },
      { name: 'Education authorities', detail: 'School system collaboration' },
    ],
  },
  {
    id: 'research',
    label: 'Research Agencies',
    items: [
      { name: 'Food systems research partners', detail: 'Collaborative learning & field evidence' },
      { name: 'Climate & agriculture institutes', detail: 'Smart farming awareness' },
      { name: 'Youth development researchers', detail: 'Career & wellbeing insights' },
    ],
  },
];

/** Projects run by C360 Innovation Labs. */
export const c360Projects = [
  {
    id: 'climate',
    title: 'Smart Climate Farming',
    summary: 'Growing resilience, one farm at a time.',
    items: [
      {
        name: 'Climate-smart agriculture pilots',
        body: 'We work with young innovators and smallholder farmers to pilot climate-smart agricultural practices — from soil health to water-efficient techniques — that protect livelihoods against a changing climate while opening new agribusiness pathways for youth.',
      },
    ],
  },
  {
    id: 'revel',
    title: 'REVEL Roots Uganda',
    summary: 'Making global value chains more human, more ecological.',
    items: [
      {
        name: 'Immersive food systems exchange',
        body: 'A 3-week immersive food systems exchange co-hosted with REVEL (Belgium), bringing young Europeans into Uganda’s farming communities — from smallholder cooperatives to export-oriented value chains — to reimagine what a fairer, more sustainable food system looks like from the ground up.',
      },
    ],
  },
  {
    id: 'sports',
    title: 'Sports4Development',
    summary: 'Unity, peace, and development — on the field.',
    items: [
      {
        name: 'Sport for youth cohesion',
        body: 'We use sport as a platform for youth cohesion and community healing, particularly in post-conflict Northern Uganda, turning teams and tournaments into spaces where young people build discipline, leadership, and lasting peace.',
      },
    ],
  },
  {
    id: 'fund',
    title: 'Community Revolving Fund',
    summary: 'Backing ideas worth believing in.',
    items: [
      {
        name: 'Revolving seed capital',
        body: 'A small-grants and micro-financing pool that turns lab prototypes into real pilots. Young innovators access seed capital, repay into the fund as their idea grows, and open the door for the next founder behind them — a cycle of opportunity, not a one-time handout.',
      },
    ],
  },
  {
    id: 'media',
    title: 'C360 Media',
    summary: 'Amplifying the voices too often left unheard.',
    items: [
      {
        name: 'Community storytelling',
        body: 'Our storytelling arm documents and shares the realities, ideas, and successes of the communities we work in — turning lived experience into content that informs partners, attracts support, and puts community voices at the centre of the narrative.',
      },
    ],
  },
  {
    id: 'mobility',
    title: 'C360 Mobility',
    summary: 'Mentoring — and delivering — the next global workforce.',
    items: [
      {
        name: 'Work-ready talent pipeline',
        body: 'We prepare young people not just with career guidance but with real workplace readiness, connecting a trusted, work-ready talent pipeline to industries and employers in Uganda and internationally who need reliable, skilled workers.',
      },
    ],
  },
];
