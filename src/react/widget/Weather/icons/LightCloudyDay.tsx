import * as React from 'react';


function LightCloudyDay(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox={'0 0 480 480'} width={'1em'} height={'1em'} {...props}>
      <circle cx={256} cy={240} r={224} fill={'#FFC107'} />
      <path
        d={'M331.872 208.096C317.664 152.288 267.008 112 208 112c-45.6 0-87.968 24.8-110.752 64H96c-52.928 0-96 43.072-96 96s43.072 96 96 96h240c44.128 0 80-35.872 80-80 0-45.472-38.432-82.048-84.128-79.904z'}
        fill={'#E3F2FD'}
      />
    </svg>
  );
}

const MemoLightCloudyDay = React.memo(LightCloudyDay);
export default MemoLightCloudyDay;
