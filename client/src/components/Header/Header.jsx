import { useState } from "react";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { IoIosMore } from "react-icons/io";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const {user} = useSelector(state => state.auth);
  console.log(user);
  

  const [items, setItems] = useState([
    { id: 1, name: "Home", current: false, to: "/" },
    { id: 2, name: "Login", current: false, to: "/login" },
    { id: 3, name: "Signup", current: false, to: "/signup" },
  ]);

  const [userOptions,setUserOptions] = useState([
    {id:1,name:"Home",current:false,to:"/"},
    {id:2, name:"All Courses", current:false, to:"/all-courses"},
    {id:3, name:"Enrolled Courses", current:false, to:"/enrolled-courses"}
  ])

  const handleClick = (id) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? { ...item, current: true }
          : { ...item, current: false }
      )
    );
  };
  const handleOptionClick = (id) => {
    setUserOptions(
      items.map((item) =>
        item.id === id
          ? { ...item, current: true }
          : { ...item, current: false }
      )
    );
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <Disclosure as="nav" className="bg-gray-800 fixed top-0 w-full z-50">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center"></div>
            {!user ? (<div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {items.map((item) => (
                  
                  <Link
                    key={item.name}
                    to={item.to}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                    onClick={() => {
                      handleClick(item.id);
                    }}
                  >
                    {item.name}
                  </Link>
                 
                ))}
              </div>
            </div>):(<div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {userOptions.map((item) => (
                  
                  <Link
                    key={item.name}
                    to={item.to}
                    aria-current={item.current ? "page" : undefined}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                    onClick={() => {
                      handleOptionClick(item.id);
                    }}
                  >
                    {item.name}
                  </Link>
                 
                ))}
              </div>
            </div>)}
            
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Profile dropdown */}

            {user && 
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <IoIosMore className="text-xl text-white" />
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                    >
                      Your Profile
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <a
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                    >
                      Sign out
                    </a>
                  </MenuItem>
                </MenuItems>
              </Menu>
            }
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {items.map((item) => (
            <Link
              key={item.name}
              as="a"
              to={item.to}
              aria-current={item.current ? "page" : undefined}
              className={classNames(
                item.current
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
              onClick={() => {
                handleClick(item.id);
              }}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
};

export default Header;
