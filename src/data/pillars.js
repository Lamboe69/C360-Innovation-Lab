/** C360 operates under four pillars — shared content for nav, pages, and directories. */

export const pillarNavItems = [
  ['Home', '/'],
  ['About', '/about'],
  ['Labs', '/labs'],
  ['Career Platform', '/career'],
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
    id: 'agri',
    title: 'Agribusiness and Food Systems',
    summary: 'Strengthen rural livelihoods and food systems through farmer support and collaborative learning.',
    items: [
      {
        name: 'Rural Farmer Support & Farmer Empowerment',
        body: 'Programs that equip rural farmers with skills, networks, and practical tools to grow resilient food enterprises.',
      },
      {
        name: 'Revel Roots',
        body: 'A fellowship bringing Europeans to Uganda to strengthen food systems through collaborative learning with local communities and labs.',
      },
    ],
  },
  {
    id: 'media',
    title: 'C360 Media',
    summary: 'Storytelling for change — amplifying community change agents.',
    items: [
      {
        name: 'Storytelling for Change',
        body: 'Teaches young people storytelling craft and helps amplify the voices of community change agents across our labs and network.',
      },
    ],
  },
  {
    id: 'talent',
    title: 'C360 Talent Mobility',
    summary: 'Connect our alumni workforce to real opportunities.',
    items: [
      {
        name: 'Mentored Workforce Placement',
        body: 'Our dynamic workforce includes interns, housekeepers, professionals, and consultants. Navigate availability lists of readily mentored talent and speak with our agent to deploy the right people for your needs.',
      },
    ],
  },
  {
    id: 'sports',
    title: 'C360 Sports4Development',
    summary: 'Sport, culture, and enterprise for resilience — especially women and girls.',
    items: [
      {
        name: 'Community Sports & Street Business Coaching',
        body: 'We support local community sports and cultural groups, especially women and girls, to build resilience while providing certified street business coaching for self-reliance.',
      },
    ],
  },
  {
    id: 'fund',
    title: 'C360 Revolving Fund',
    summary: 'Community capital for lab-born start-ups.',
    items: [
      {
        name: 'Revolving Community Empowerment Fund',
        body: 'We run a revolving fund that fuels business start-ups sprouting from our labs — capital that returns to support the next cohort of builders.',
      },
    ],
  },
  {
    id: 'climate',
    title: 'Smart Climate Awareness',
    summary: 'Smart farming with environmental stewardship.',
    items: [
      {
        name: 'Smart Climate Awareness Initiative',
        body: 'Promotes smart farming practices while protecting the environment — linking lab projects to climate-conscious livelihoods.',
      },
    ],
  },
];
