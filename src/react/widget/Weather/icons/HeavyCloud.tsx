import * as React from 'react';


function HeavyCloud(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox={'0 0 512 512'} width={'1em'} height={'1em'} {...props}>
      <path
        d={'M412.864 224.032C397.92 150.016 333.088 96 256 96c-64.032 0-121.504 38.112-146.688 96.032C48.8 193.472 0 243.136 0 304c0 61.76 50.24 112 112 112h304c52.928 0 96-43.072 96-96 0-53.984-45.536-97.344-99.136-95.968z'}
        fill={'#E3F2FD'}
      />
    </svg>
  );
}

const MemoHeavyCloud = React.memo(HeavyCloud);
export default MemoHeavyCloud;
