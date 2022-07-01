import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Login from '../components/auth/Login';
import Register from '../components/auth/Register';

export default function Auth() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);

  useEffect(() => {
    if (localStorage.token) {
      router.push('/');
    }
  }, []);

  return (
    <div className="bg-gray-900	 h-screen flex justify-center items-center">
      <div className="w-2/6">
        <div className="text-3xl text-white font-mono mb-14 text-center">
          Kontenbase + NextJs
        </div>
        {isRegister ? (
          <Register setIsRegister={setIsRegister} />
        ) : (
          <Login setIsRegister={setIsRegister} />
        )}
      </div>
    </div>
  );
}
