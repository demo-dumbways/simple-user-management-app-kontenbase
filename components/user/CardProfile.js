import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import kontenbase from '../../config/kontenbase';

export default function CardProfile(props) {
  const { user } = props;
  const router = useRouter();

  const logout = async () => {
    const { error } = await kontenbase.auth.logout();

    if (error) {
      return alert(error.message);
    }
    router.push('/auth');
  };

  return (
    <div className="col-span-4">
      <div className="text-center border rounded-lg p-4 border-orange-400">
        <Image
          src={
            user?.image && user?.image?.length != 0
              ? user?.image[0]?.url
              : '/profile.jpeg'
          }
          alt=""
          width="100"
          height="100"
          className="object-cover rounded-full"
        />
        <div id="name">
          {user.firstName} {user.lastName}
        </div>
        <div id="website">
          <span className="text-sky-600 hover:text-sky-300 cursor-pointer">
            {user.website ? user.website : '-'}
          </span>
        </div>
        {user.motto && (
          <div id="motto" className="font-mono text-sm text-gray-300 mt-4">
            "{user.motto}"
          </div>
        )}
        <div id="email" className="text-gray-500 text-sm my-4">
          Contact me <br />
          <span className="text-white">{user.email}</span>
        </div>
        <button
          className="w-full border hover:border-red-800 rounded mt-2 py-1 hover:bg-red-800"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
