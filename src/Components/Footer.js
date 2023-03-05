import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="p-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 sm:p-6 dark:bg-gray-900">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="https://flowbite.com/" className="flex items-center">
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                ElectionChain
              </span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Team
              </h2>
              <ul className="text-gray-600 dark:text-gray-400">
                <li className="mb-4 text-white">Anish Kulkarni</li>
                <li className="mb-4 text-white">Rachana Yeldi</li>
                <li className="mb-4 text-white">Meet Patel</li>
                <li className="mb-4 text-white">Jenil Savla</li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Useful Links
              </h2>
              <ul className="text-gray-600 dark:text-gray-400">
                <li className="mb-4 text-white">
                  <a
                    href="https://github.com/themesberg/flowbite"
                    className="hover:underline "
                  >
                    Home
                  </a>
                </li>
                <li className="text-white">
                  <a
                    href="https://discord.gg/4eeurUVvTy"
                    className="hover:underline"
                  >
                    Vote
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            <p className="text-white justify-center text-xl font-medium">Designed & Developed by Team Code-a-Palooza</p>
          </span>
        </div>
      </footer>
    </>
  );
};

export default Footer;
