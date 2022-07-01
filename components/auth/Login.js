import { useState } from 'react';
import { useRouter } from 'next/router';
import kontenbase from '../../config/kontenbase';

export default function Login(props) {
  const { setIsRegister } = props;
  const router = useRouter();

  const [isError, setIsError] = useState(null);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      const { user, token, error } = await kontenbase.auth.login(form);

      if (error) {
        return setIsError(error.message);
      }

      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={onSubmit}>
      {isError && (
        <div
          className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
          role="alert"
        >
          {isError}
        </div>
      )}
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Your email
        </label>
        <input
          type="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
          placeholder="name@kontenbase.com"
          name="email"
          onChange={onChange}
          value={form.email}
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Your password
        </label>
        <input
          type="password"
          id="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-orange-500 dark:focus:border-orange-500"
          name="password"
          onChange={onChange}
          value={form.password}
        />
      </div>
      <div className="text-right">
        <button
          type="button"
          className="text-white cursor-pointer"
          onClick={() => setIsRegister(true)}
        >
          Register
        </button>
        <button
          type="submit"
          className="ml-4 text-white bg-orange-600 hover:bg-orange-900 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-600 dark:focus:ring-orange-800"
        >
          Login
        </button>
      </div>
    </form>
  );
}
