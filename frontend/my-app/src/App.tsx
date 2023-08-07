import { Suspense, lazy, useEffect } from "react";
import { useUserContext } from "./context/UserContext";
import Delayedfallback from "./components/Delayedfallback";
const Login = lazy(() => import ('./components/Login'));
const Header = lazy(() => import ('./components/Header'));

function App() {
  //custom hook user context
  const {userId, setUserId} = useUserContext();

  //page title
  document.title = 'My notes';


  const checkSession = async () => {
    try {
      const res = await fetch('http://localhost:8000/check-session');
      if (!res.ok) {
        throw new Error('Failed to fetch');
      }
      const result = await res.json();
      if (result.message !== 'No') {
        setUserId(result.message);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  useEffect(()=> {
    checkSession();
  }, [userId]);
  return (
    <>
      {/*<div className="flex justify-center items-center bg-black h-screen">
        <p className='text-sky-400 text-6xl'> Welcome:{userId}</p>
      </div>*/}
      <Suspense fallback={<Delayedfallback />}>
        {userId === '' ? (
          <Login />
        ) : (
          <Header />
        )}
      </Suspense>
    </>
  );
}

export default App;
