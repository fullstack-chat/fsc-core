import React, { useEffect } from 'react'
import { FaCircleNotch } from 'react-icons/fa';
import { useLocation } from '@reach/router';
import Loading from '../../components/Loading';


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
    <Loading />
  )
}

export default SpacesPage