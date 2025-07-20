// export function AconShieldLogo(props: React.ComponentProps<typeof Image>) {
//   return (
//     // <svg
//     //   xmlns="logo"
//     //   viewBox="0 0 200 50"
//     //   width="140"
//     //   height="40"
//     //   {...props}
//     // >
//       /*{ <text
//         x="0"
//         y="35"
//         fontFamily="inherit"
//         fontSize="32"
//         fontWeight="900"
//         fill="hsl(var(--primary))"
//       >
//         Acon
//       </text>
//       <text
//         x="85"
//         y="35"
//         fontFamily="inherit"
//         fontSize="32"
//         fontWeight="400"
//         fill="hsl(var(--foreground))"
//       >
//         Shield
//       </text> }*/
//     // </svg>
//     <img
//       src={logo}
//       alt="Acon Shield Logo"
//       width={140}
//       height={40}
//       {...props}
//     />
//   );
// }

// components/AconShieldLogo.tsx
import Image from 'next/image';
import logo from './LOGO-ACON.png';

export function AconShieldLogo(props: Omit<React.ComponentProps<typeof Image>, 'src' | 'alt' | 'width' | 'height'>) {
  return (
    <div style={{ position: 'relative', width: 120, height: 75 }}>
      <Image
        src={logo}
        alt="Acon Shield Logo"
        layout="fill"
        objectFit="contain"
      />
      {/* <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        display: 'flex',
        gap: '8px',
        fontFamily: 'inherit',
        fontSize: 32,
        alignItems: 'center',
        height: '100%',
        paddingLeft: 8
      }}>
        <span style={{ fontWeight: 500, color: 'hsl(var(--primary))' }}>Acon</span>
        <span style={{ fontWeight: 200, color: 'hsl(var(--foreground))' }}>Seguridad</span>
      </div> */}
    </div>
  );
}
