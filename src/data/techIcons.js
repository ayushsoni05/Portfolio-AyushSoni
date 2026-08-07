import {
  SiTypescript,
  SiExpress,
  SiTailwindcss,
  SiReact,
  SiGit,
  SiPython,
  SiNextdotjs,
  SiNodedotjs,
  SiMysql,
  SiFirebase,
  SiMongodb,
  SiHtml5,
  SiCss,
  SiJavascript,
  SiDocker,
  SiCplusplus,
  SiGithub,
  SiFigma,
  SiVercel,
  SiVite,
  SiPostman,
} from 'react-icons/si';

export const ORBIT_ICONS = [
  // Ring 0 (inner): 6 icons, CW, size 40-44, duration 120, angles 0, 60, 120, 180, 240, 300
  { Icon: SiTypescript, ring: 0, angle: 0, cw: true, size: 40, duration: 120 },
  { Icon: SiExpress, ring: 0, angle: 60, cw: true, size: 42, duration: 120 },
  { Icon: SiJavascript, ring: 0, angle: 120, cw: true, size: 44, duration: 120 },
  { Icon: SiTailwindcss, ring: 0, angle: 180, cw: true, size: 40, duration: 120 },
  { Icon: SiReact, ring: 0, angle: 240, cw: true, size: 42, duration: 120 },
  { Icon: SiGit, ring: 0, angle: 300, cw: true, size: 44, duration: 120 },

  // Ring 1 (middle): 5 icons, CCW, size 65, duration 100, angles 0, 72, 144, 216, 288
  { Icon: SiPython, ring: 1, angle: 0, cw: false, size: 65, duration: 100 },
  { Icon: SiHtml5, ring: 1, angle: 72, cw: false, size: 65, duration: 100 },
  { Icon: SiNodedotjs, ring: 1, angle: 144, cw: false, size: 65, duration: 100 },
  { Icon: SiDocker, ring: 1, angle: 216, cw: false, size: 65, duration: 100 },
  { Icon: SiCss, ring: 1, angle: 288, cw: false, size: 65, duration: 100 },

  // Ring 2 (outer): 6 icons, CW, size 100, duration 80, angles 0, 60, 120, 180, 240, 300
  { Icon: SiNextdotjs, ring: 2, angle: 0, cw: true, size: 100, duration: 80 },
  { Icon: SiMongodb, ring: 2, angle: 60, cw: true, size: 100, duration: 80 },
  { Icon: SiMysql, ring: 2, angle: 120, cw: true, size: 100, duration: 80 },
  { Icon: SiPostman, ring: 2, angle: 180, cw: true, size: 100, duration: 80 },
  { Icon: SiFigma, ring: 2, angle: 240, cw: true, size: 100, duration: 80 },
  { Icon: SiVercel, ring: 2, angle: 300, cw: true, size: 100, duration: 80 },
];

export const ORBIT_OPACITIES = [0.3, 0.4, 0.5];

export const MARQUEE_ROW_1 = [
  { name: 'React', Icon: SiReact },
  { name: 'Next.js', Icon: SiNextdotjs },
  { name: 'TypeScript', Icon: SiTypescript },
  { name: 'JavaScript', Icon: SiJavascript },
  { name: 'Tailwind CSS', Icon: SiTailwindcss },
  { name: 'HTML5', Icon: SiHtml5 },
  { name: 'CSS3', Icon: SiCss },
];

export const MARQUEE_ROW_2 = [
  { name: 'Node.js', Icon: SiNodedotjs },
  { name: 'Express', Icon: SiExpress },
  { name: 'Python', Icon: SiPython },
  { name: 'MongoDB', Icon: SiMongodb },
  { name: 'MySQL', Icon: SiMysql },
  { name: 'Firebase', Icon: SiFirebase },
  { name: 'Docker', Icon: SiDocker },
];

export const MARQUEE_ROW_3 = [
  { name: 'Git', Icon: SiGit },
  { name: 'GitHub', Icon: SiGithub },
  { name: 'Figma', Icon: SiFigma },
  { name: 'Vercel', Icon: SiVercel },
  { name: 'Vite', Icon: SiVite },
  { name: 'Postman', Icon: SiPostman },
  { name: 'C++', Icon: SiCplusplus },
];
