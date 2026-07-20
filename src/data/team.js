/** Core C360 team — surfaced on the About page. */

import { teamPortrait } from './media.js';

export const c360Team = {
  eyebrow: 'Core Team',
  title: 'The People Behind C360',
  description:
    'Educators, entrepreneurs, and community builders driving Uganda’s youth innovation movement across labs, the Career Engine, the Global Network, and projects.',
  members: [
    {
      slug: 'david-ochieng',
      name: 'David Ochieng',
      role: 'Executive Director',
      bio: 'Serial entrepreneur and educator with 15+ years building youth programs across East Africa.',
      photo: teamPortrait('david-ochieng'),
    },
    {
      slug: 'amara-nakato',
      name: 'Amara Nakato',
      role: 'Head of Programs',
      bio: 'Former UNDP program officer specialising in youth enterprise and innovation curriculum design.',
      photo: teamPortrait('amara-nakato'),
    },
    {
      slug: 'brian-ssemakula',
      name: 'Brian Ssemakula',
      role: 'Head of Mentorship',
      bio: 'Tech founder and mentor connecting Uganda’s brightest youth with industry leaders and investors.',
      photo: teamPortrait('brian-ssemakula'),
    },
    {
      slug: 'grace-atim',
      name: 'Grace Atim',
      role: 'Community Lead',
      bio: 'Grassroots organiser who has launched and scaled C360 labs across Northern and Eastern Uganda.',
      photo: teamPortrait('grace-atim'),
    },
    {
      slug: 'moses-tumwine',
      name: 'Moses Tumwine',
      role: 'Finance & Partnerships',
      bio: 'CPA and development finance specialist managing grants, budgets, and strategic partner relations.',
      photo: teamPortrait('moses-tumwine'),
    },
    {
      slug: 'lydia-kemigisha',
      name: 'Lydia Kemigisha',
      role: 'Creative Director',
      bio: 'Brand strategist and designer shaping C360’s identity, communications, and digital presence.',
      photo: teamPortrait('lydia-kemigisha'),
    },
  ],
};
