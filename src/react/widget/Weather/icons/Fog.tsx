import * as React from 'react';


function Fog(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox={'0 0 512 512'} width={'1em'} height={'1em'} {...props}>
      <path
        d={'M416 160c-1.024 0-2.048 0-3.136.032C397.952 86.016 333.088 32 256 32c-64.032 0-121.504 38.112-146.688 96.032C48.8 129.472 0 179.136 0 240c0 61.76 50.24 112 112 112h304c52.928 0 96-43.072 96-96s-43.072-96-96-96z'}
        fill={'#E3F2FD'}
      />
      <g fill={'#607D8B'}>
        <path d={'M464 384H48c-8.832 0-16 7.168-16 16s7.168 16 16 16h416c8.832 0 16-7.168 16-16s-7.168-16-16-16zM464 448H48c-8.832 0-16 7.168-16 16s7.168 16 16 16h416c8.832 0 16-7.168 16-16s-7.168-16-16-16z'} />
      </g>
    </svg>
  );
}

const MemoFog = React.memo(Fog);
export default MemoFog;
