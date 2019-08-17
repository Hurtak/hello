import image01 from "./mod/images/01.jpg";
import image02 from "./mod/images/02.jpg";
import image03 from "./mod/images/03.jpg";
import image04 from "./mod/images/04.jpg";
import image05 from "./mod/images/05.jpg";
import image06 from "./mod/images/06.jpg";
import image07 from "./mod/images/07.jpg";
import image08 from "./mod/images/08.jpg";
import image09 from "./mod/images/09.jpg";
import image10 from "./mod/images/10.jpg";
import image11 from "./mod/images/11.jpg";
import image12 from "./mod/images/12.jpg";
import image13 from "./mod/images/13.jpg";
import image14 from "./mod/images/14.jpg";
import image15 from "./mod/images/15.jpg";
import image16 from "./mod/images/16.jpg";

export type Image = {
  url: string;
  name?: string;
  location?: string;
  source: {
    type: "UNSPLASH";
    url: string;
  };
  author?: {
    name: string;
    url: string;
  };
};

export const images: Image[] = [
  {
    url: image01,
    name: "Glacier National Park",
    location: "Going-to-the-Sun Road, West Glacier, United States",
    source: {
      type: "UNSPLASH",
      url: "https://unsplash.com/photos/uWvl0xuVScI",
    },
  },

  {
    url: image02,
    name: "The emphasis on the sunset",
    location: "Monte Grappa, Italy",
    source: {
      type: "UNSPLASH",
      url: "https://unsplash.com/photos/kRnkqSKZODQ",
    },
    author: {
      name: "Federico Beccari",
      url: "https://unsplash.com/@federize",
    },
  },

  {
    url: image03,
    location: "Mount Hood National Forest, United States",
    source: {
      type: "UNSPLASH",
      url: "https://unsplash.com/photos/FlwhX4vtzt0",
    },
    author: {
      name: "Adrian",
      url: "https://unsplash.com/@aows",
    },
  },

  {
    url: image04,
    name: "Gloomy forest in the fog",
    source: {
      type: "UNSPLASH",
      url: "https://unsplash.com/photos/qKFxQ3X-YbI",
    },
    author: {
      name: "Jay Mantri",
      url: "https://unsplash.com/@jaymantri",
    },
  },

  {
    url: image05,
    name: "Orange clouds over mountains",
    location: "Hidden Lake Lookout trailhead, United States",
    source: {
      type: "UNSPLASH",
      url: "https://unsplash.com/photos/RbbdzZBKRDY",
    },
    author: {
      name: "Nitish Meena",
      url: "https://unsplash.com/@nitishm",
    },
  },

  {
    url: image06,
    location: "Kish, Iran",
    source: {
      type: "UNSPLASH",
      url: "https://unsplash.com/photos/ZB5MoRLb8Ws",
    },
    author: {
      name: "Sam Moqadam",
      url: "https://unsplash.com/@itsbluestudio",
    },
  },

  {
    url: image07,
    name: "Half dome in Yosemite",
    location: "Half Dome Trail, Yosemite Village, United States",
    source: {
      type: "UNSPLASH",
      url: "https://unsplash.com/photos/TmYeK2FfjlE",
    },
    author: {
      name: "Cameron Venti",
      url: "https://unsplash.com/@cmventi20",
    },
  },

  {
    url: image08,
    location: "Niederbauen-Chulm, Emmetten, Switzerland",
    source: {
      type: "UNSPLASH",
      url: "https://unsplash.com/photos/kk3W5-0b6e0",
    },
    author: {
      name: "Dino Reichmuth",
      url: "https://unsplash.com/@dinoreichmuth",
    },
  },

  {
    url: image09,
    location: "Paralia Gerakas, Greece",
    source: {
      type: "UNSPLASH",
      url: "https://unsplash.com/photos/mtNweauBsMQ",
    },
    author: {
      name: "Viktor Jakovlev",
      url: "https://unsplash.com/@apviktor",
    },
  },

  {
    url: image10,
    name: "Vernazza sunset",
    location: "Vernazza, Italy",
    source: {
      type: "UNSPLASH",
      url: "https://unsplash.com/photos/cYrMQA7a3Wc",
    },
    author: {
      name: "Anders Jildén",
      url: "https://unsplash.com/@andersjilden",
    },
  },

  {
    url: image11,
    name: "El Capitan on a sunny afternoon",
    location: "El Cap, Yosemite National Park, United States",
    source: {
      type: "UNSPLASH",
      url: "https://unsplash.com/photos/ndN00KmbJ1c",
    },
    author: {
      name: "Adam Kool",
      url: "https://unsplash.com/@adamkool",
    },
  },

  {
    url: image12,
    location: "Landmannalaugar, Iceland",
    source: {
      type: "UNSPLASH",
      url: "https://unsplash.com/photos/CTVGEm6V8qI",
    },
    author: {
      name: "Joshua Sortino",
      url: "https://unsplash.com/@sortino",
    },
  },

  {
    url: image13,
    name: "Mountain reflection from jetty",
    source: {
      type: "UNSPLASH",
      url: "https://unsplash.com/photos/_9phetFNNgs",
    },
    author: {
      name: "Adrian",
      url: "https://unsplash.com/@aows",
    },
  },

  {
    url: image14,
    location: "Mount Tamalpais, United States",
    source: {
      type: "UNSPLASH",
      url: "https://unsplash.com/photos/uAcrEhN8JEQ",
    },
    author: {
      name: "Joshua Sortino",
      url: "https://unsplash.com/@sortino",
    },
  },

  {
    url: image15,
    location: "ZhangJiaJie National Park, China",
    source: {
      type: "UNSPLASH",
      url: "https://unsplash.com/photos/pjsrHjXGnVs",
    },
    author: {
      name: "Robs",
      url: "https://unsplash.com/@therawbean",
    },
  },

  {
    url: image16,
    location: "Bled, Slovenia",
    source: {
      type: "UNSPLASH",
      url: "https://unsplash.com/photos/Dm-qxdynoEc",
    },
    author: {
      name: "Florian van Duyn",
      url: "https://unsplash.com/@flovayn",
    },
  },
];
