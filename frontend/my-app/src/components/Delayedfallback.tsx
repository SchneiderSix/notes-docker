import { Jelly } from '@uiball/loaders'
import { useEffect, useState } from 'react'

export default function Delayedfallback() {
  const [show, setShow] = useState<boolean>(true);
  useEffect(()=> {
    let timer = setTimeout(()=> setShow(false), 3000);
    return () => {
      clearTimeout(timer);
    }
  }, []);
  return (
    <>
      {show && <Jelly size={60} color='cyan'/>}
    </>
  )
}
