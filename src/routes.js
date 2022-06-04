import CharacterLocation from "./components/page/CharacterLocation";
import CharacterDetail from "./components/page/CharacterDetail";
import Characters from "./components/page/Characters";
import Location from "./components/page/Location";
import Search from "./components/page/Search";


const routes = [
  { title: "Characters", path: "/", element: Characters, isNav: true },
  {
    title: "Character Detail",
    path: "/:characterId",
    element: CharacterDetail,
    isNav: false,
  },
  { title: "Location", path: "location", element: Location, isNav: true },
  { 
    title: "Character By Location", 
    path: "/location/:locationId/", 
    element: CharacterLocation, 
    isNav: false 
  },
  { 
    title: "Character Detail By Location", 
    path: "/location/:locationId/:characterId", 
    element: CharacterDetail, 
    isNav: false 
  },
  { title: "Character Search", path: "search", element: Search, isNav: false },
  { 
    title: "Character Searched Detail", 
    path: "/search/characters/:characterId", 
    element: CharacterDetail, 
    isNav: false 
  },

  { title: "Character Search", path: "search/location", element: Search, isNav: false },
  { 
    title: "Character Searched Detail", 
    path: "/search/locations/:locationId", 
    element: CharacterDetail, 
    isNav: false 
  },
  
];

export default routes;
