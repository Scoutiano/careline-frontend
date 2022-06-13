import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
  {
    title: "Profile",
    path: "/profile",
    icon: <FaIcons.FaUserAlt />,
    cName: "nav-text",
  },
  {
    title: "Events",
    path: "/events",
    icon: <FaIcons.FaClipboardList />,
    cName: "nav-text",
  },
  {
    title: "Send Message",
    path: "/sendTicket",
    icon: <FaIcons.FaCommentDots />,
    cName: "nav-text",
  },
  // {
  //     title: 'Team',
  //     path: '/team',
  //     icon: <IoIcons.IoMdPeople />,
  //     cName: 'nav-text'
  // },
  // {
  //     title: 'Messages',
  //     path: '/messages',
  //     icon: <FaIcons.FaEnvelopeOpenText />,
  //     cName: 'nav-text'
  // },
  // {
  //     title: 'Support',
  //     path: '/support',
  //     icon: <IoIcons.IoMdHelpCircle />,
  //     cName: 'nav-text'
  // }
];
