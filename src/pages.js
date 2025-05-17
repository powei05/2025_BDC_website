import {
    Home,
    Description,
    TeamMembers,
    Pov,
     DemoPage,
  } from "./contents";


  
  const Pages = [
    {
      name: "Home",
      title: "Homepage",
      path: "/",
      component: Home,
      lead: "",
      icon: "https://static.igem.wiki/teams/5112/icons/description-2x.png",
    },
    {
      name: "Description",
      title: "Project Description",
      path: "/description",
      component: Description,
      lead: "",
      icon: "../../public/reporting.png",
    },
    {
      name: "Team Members",
      title: "Team Members",
      path: "/team-members",
      component: TeamMembers,
      lead: "",
      icon: "../../public/group-chat.png",
    },
    {
      name: "Demo",
      title: "Petrichor Demo",
      path: "/demo",
      component: DemoPage,
      lead: "Try our real-time clothing color changer!",
      icon: "../../public/webcam.png",
    },
    {
      name: "POV",
      title: "POV",
      path: "/pov",
      component: Pov,
      lead: "",
      icon: "../../public/group-chat.png",
    },

    // {
    //   name: "Project",
    //   folder: [
    //     {
    //       name: "Description",
    //       title: "Project Description",
    //       path: "/description",
    //       component: Description,
    //       lead: "",
    //       icon: "https://static.igem.wiki/teams/5112/icons/description-2x.png",
    //     },
    //     ]
    // }
  ];
  
  export default Pages;
  