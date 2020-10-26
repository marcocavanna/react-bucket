import * as React from 'react';


function CloudyDay(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox={'0 0 512 512'} width={'1em'} height={'1em'} {...props}>
      <circle cx={416} cy={176} r={96} fill={'#FFC107'} />
      <path
        d={'M412.864 240.032C397.92 166.016 333.088 112 256 112c-64.032 0-121.504 38.112-146.688 96.032C48.8 209.472 0 259.136 0 320c0 61.76 50.24 112 112 112h304c52.928 0 96-43.072 96-96 0-53.984-45.536-97.344-99.136-95.968z'}
        fill={'#E3F2FD'}
      />
    </svg>
  );
}

const MemoCloudyDay = React.memo(CloudyDay);
export default MemoCloudyDay;
