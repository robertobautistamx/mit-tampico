import React from "react";

export const MailIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width={20} height={20} fill="none" viewBox="0 0 24 24" {...props}>
    <path d="M2 6.5A2.5 2.5 0 014.5 4h15A2.5 2.5 0 0122 6.5v11A2.5 2.5 0 0119.5 20h-15A2.5 2.5 0 012 17.5v-11z" stroke="#1976d2" strokeWidth={1.5} />
    <path d="M22 6.5l-10 7-10-7" stroke="#1976d2" strokeWidth={1.5} />
  </svg>
);

export const LockIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width={20} height={20} fill="none" viewBox="0 0 24 24" {...props}>
    <rect x={5} y={11} width={14} height={8} rx={2} stroke="#1976d2" strokeWidth={1.5} />
    <path d="M8 11V8a4 4 0 118 0v3" stroke="#1976d2" strokeWidth={1.5} />
  </svg>
);

export const EyeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width={20} height={20} fill="none" viewBox="0 0 24 24" {...props}>
    <ellipse cx={12} cy={12} rx={8} ry={5} stroke="#1976d2" strokeWidth={1.5} />
    <circle cx={12} cy={12} r={2} fill="#1976d2" />
  </svg>
);

export const EyeOffIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width={20} height={20} fill="none" viewBox="0 0 24 24" {...props}>
    <ellipse cx={12} cy={12} rx={8} ry={5} stroke="#1976d2" strokeWidth={1.5} />
    <path d="M4 4l16 16" stroke="#1976d2" strokeWidth={1.5} />
  </svg>
);

export const ArrowRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
