import * as React from 'react';

function ClearDay(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox='0 0 448 448' width='1em' height='1em' {...props}>
      <circle cx={224} cy={224} r={224} fill='#ffc107' />
    </svg>
  );
}

const MemoClearDay = React.memo(ClearDay);
export default MemoClearDay;
