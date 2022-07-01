import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';

import kontenbase from '../config/kontenbase';

import CardProfile from '../components/user/CardProfile';
import FormUpdateProfile from '../components/user/FormUpdateProfile';

export default function Home() {
  const router = useRouter();

  const [user, setUser] = useState({});

  const getUser = async () => {
    try {
      let { user, error } = await kontenbase.auth.user();
      if (error) {
        return console.log(error);
      }

      let { data: profile, error: errorProfile } = await kontenbase
        .service('Profile')
        .find({
          where: { user: user._id },
        });

      if (errorProfile) {
        return console.log(errorProfile);
      }

      profile = profile.length != 0 && profile[0];

      user.motto = profile?.motto;
      user.website = profile?.website;
      user.image = profile?.image;
      user.idProfile = profile?._id;

      setUser(user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!localStorage.token) {
      return router.push('/auth');
    }
    getUser();
  }, []);

  return (
    <div className="h-screen bg-gray-900		 text-white">
      <div className="container mx-auto grid grid-cols-12 gap-4 pt-10">
        <CardProfile user={user} />
        <FormUpdateProfile user={user} getUser={getUser} />
      </div>
    </div>
  );
}
