import React, { useEffect } from 'react'
import { FaCircleNotch } from 'react-icons/fa';
import { useLocation } from '@reach/router';


function SpacesPage() {
  const location = useLocation();

  useEffect(() => {
    async function findSpace() {
      let spl = location.pathname.split("/")

      let res = await fetch(`/.netlify/functions/spaces?spaceId=${spl[2]}`)
      if(res.status === 200) {
        let json = await res.json();
        window.location.href = json.space_url
      }
    }
    findSpace()
  }, [])

  return (
    <div className="text-gray-200 m-8 flex items-center justify-center w-screen text-4xl">
      <FaCircleNotch className="animate-spin"/>
    </div>
  )
}

export default SpacesPage