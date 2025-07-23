import { VideoConference } from '@/components/dashboard/ClassConfrence/VideoConference'
import React, { useEffect, useState } from 'react'



const DshbVideoConfrence = () => {
const [tailwindReady, setTailwindReady] = useState(false);

  useEffect(() => {
    const existingScript = document.querySelector('script[src="https://cdn.tailwindcss.com"]');

    if (existingScript) {
      setTailwindReady(true); // already loaded
    } else {
      const script = document.createElement('script');
      script.src = 'https://cdn.tailwindcss.com';
      script.onload = () => setTailwindReady(true);
      document.head.appendChild(script);
    }

    // DON'T remove the script — let it persist
  }, []);

  if (!tailwindReady) return null;
  return (
    <div><VideoConference /></div>
  )
}

export default DshbVideoConfrence
