import React from "react";
import * as FaIcons from "react-icons/fa";


export const SidebarData = [
  // {
  //   title: "Profile",
  //   path: "/profile",
  //   icon: <FaIcons.FaUserAlt />,
  //   cName: "nav-text",
  // },

  {
    title: "Contact Counselor",
    path: "/sendTicket",
    icon: <FaIcons.FaCommentDots size={20} />,
    cName: "nav-text",
  },
  {
    title: 'Schedule a meeting',
    path: '/schedule',
    icon: <FaIcons.FaRegCalendarAlt size={20} />,
    cName: 'nav-text'
  },
  {
    title: 'Logout',
    path: '/logout',
    icon: <FaIcons.FaSignOutAlt size={20} />,
    cName: 'nav-text'
  },
  // {
  //     title: 'Support',
  //     path: '/support',
  //     icon: <IoIcons.IoMdHelpCircle />,
  //     cName: 'nav-text'
  // }
];
