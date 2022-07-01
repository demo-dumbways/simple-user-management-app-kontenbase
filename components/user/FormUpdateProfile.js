import { useState, useEffect } from 'react';
import Image from 'next/image';

import kontenbase from '../../config/kontenbase';

export default function FormUpdateProfile(props) {
  const { user, getUser } = props;
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({
    image: '',
    email: '',
    firstName: '',
    lastName: '',
    website: '',
    motto: '',
  });

  const onChange = (e) => {
    let value;
    if (e.target.type == 'file') {
      value = e.target.files[0];
      const url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    } else {
      value = e.target.value;
    }
    setForm({
      ...form,
      [e.target.name]: value,
    });
  };

  const onSubmit = async (e) => {
    try {
      e.preventDefault();

      console.log('update');

      const { data: image, error } = await kontenbase.storage.upload(
        form.image
      );

      await kontenbase.auth.update({
        firstName: form.firstName,
        lastName: form.lastName,
      });

      if (user.idProfile) {
        await kontenbase.service('Profile').updateById(user.idProfile, {
          image: [{ url: image?.url, fileName: image?.fileName }],
          website: form.website,
          motto: form.motto,
        });
      } else {
        await kontenbase.service('Profile').create({
          website: form.website,
          motto: form.motto,
        });
      }
      getUser();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!form.email) {
      setForm({
        image: user?.image,
        email: user?.email,
        firstName: user?.firstName,
        lastName: user?.lastName,
        website: user?.website,
        motto: user.motto,
      });
    }
  }, [user]);

  return (
    <div className="col-span-8">
      <div className=" border rounded-lg p-4 border-orange-400">
        <form onSubmit={onSubmit}>
          <div className="mb-6 text-center">
            {user?.image?.length != 0 && (
              <Image
                // src={'/profile.jpeg'}
                src={
                  preview
                    ? preview
                    : user?.image && user?.image?.length != 0
                    ? user?.image[0]?.url
                    : '/profile.jpeg'
                }
                width="100"
                height="100"
                className="object-cover rounded-full"
              />
            )}
            <div className="mt-2">
              <label
                htmlFor="selected-profile-image"
                className="cursor-pointer hover:text-gray-300 bg-gray-700 p-2 rounded text-sm"
              >
                Upload Image
              </label>
              <input
                type="file"
                hidden
                id="selected-profile-image"
                onChange={onChange}
                name="image"
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
              placeholder="-"
              readOnly
              value={form.email}
              onChange={onChange}
              name="email"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                placeholder="-"
                value={form.firstName}
                onChange={onChange}
                name="firstName"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
                placeholder="-"
                value={form.lastName}
                onChange={onChange}
                name="lastName"
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="website"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Website
            </label>
            <input
              type="text"
              id="website"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
              placeholder="-"
              value={form.website}
              onChange={onChange}
              name="website"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="motto"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Motto
            </label>
            <textarea
              id="motto"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
              placeholder="-"
              value={form.motto}
              onChange={onChange}
              name="motto"
            ></textarea>
          </div>
          <div className="text-right">
            <button
              type="submit"
              className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
