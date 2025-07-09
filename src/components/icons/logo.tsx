import type { SVGProps } from 'react';

export function AconShieldLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 50"
      width="140"
      height="40"
      {...props}
    >
      <text
        x="0"
        y="35"
        fontFamily="inherit"
        fontSize="32"
        fontWeight="900"
        fill="hsl(var(--primary))"
      >
        Acon
      </text>
      <text
        x="85"
        y="35"
        fontFamily="inherit"
        fontSize="32"
        fontWeight="400"
        fill="hsl(var(--foreground))"
      >
        Shield
      </text>
    </svg>
  );
}
