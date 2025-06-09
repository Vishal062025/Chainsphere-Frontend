import React from "react";
import { navItem } from "@/lib/constant";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { handleNavItemClick } from "@/lib/utils";

const NavMenu = ({showNavMenu, setShowNavMenu}) => {

  // const menuItems = ['HOME', 'ABOUT', 'FEATURES', 'TOKONOMICS', 'ROADMAP'];

    const sectionIds = navItem.map(item => item.id);
    const activeSectionId = useScrollSpy(sectionIds);

  function handleNavItemClickResponsive(id) {
    if (!id) return;
    handleNavItemClick(id);
    setShowNavMenu(prevState => !prevState);
  }

    return (
    <>
      <ul className="gap-6 xl:gap-11 items-center lg:flex hidden">
      {navItem.map((item) => (
        <li key={item.id}>
          <a
            className={`font-semibold cursor-pointer transition-colors duration-100 ease-in-out 
                            ${
                              item.id === activeSectionId
                                ? "text-[#9b4bff]"
                                : "hover:text-[#9b4bff]"
                            }`}
            onClick={() => handleNavItemClick(item.id)}
          >
            {item.title}
          </a>
        </li>
      ))}
      </ul>
        {
          showNavMenu && 
          <div className="flex flex-col justify-center items-center min-h-fit fixed w-full px-4 top-[72px]">
            <div className="bg-white p-5 rounded-lg shadow-lg border border-gray-200 w-full">
              <ul className="divide-y divide-gray-200">
                  {navItem.map((item) => (
                    <li key={item.id} className="py-4">
                      <a
                        className={`font-semibold cursor-pointer transition-colors duration-100 ease-in-out 
                        ${item.id === activeSectionId
                            ? "text-[#9b4bff]"
                          : "text-black hover:text-[#9b4bff]"
                          }`}
                        onClick={() => handleNavItemClickResponsive(item.id)}
                      >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        }
    </>
  );
};

export default NavMenu;
