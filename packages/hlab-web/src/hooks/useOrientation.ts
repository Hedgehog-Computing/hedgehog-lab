import { useEffect, useState } from 'react';

function getOrientation() {
  return window.innerHeight > window.innerWidth;
}

function useOrientation() {
  const [isPortrait, setIsPortrait] = useState(getOrientation());

  useEffect(() => {
    function handleResize() {
      setIsPortrait(getOrientation());
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isPortrait;
}

export default useOrientation;
