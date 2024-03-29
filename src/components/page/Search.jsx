import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
//components
import CharacterSearch from "./CharacterSearch";
import SearchLocation from './SearchLocation'
import CharacterCard from "../base/CharacterCard";
//api
import BASE_URL from "../../api";
import BASE_URL_2 from "../../api_location";
//icons
import { RiErrorWarningLine } from "react-icons/ri";

const Search = () => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const search = urlParams.get("name");
  const [searchCharacter, setSearchCharacter] = useState([]);
  const searchLocation = urlParams.get("name");
  const [searchLocations, setSearchLocation] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/?name=${search}`)
      .then((res) => res.json())
      .then((results) => {
        const data = results.results;
        setSearchCharacter(data);
      });
  }, [search]);

  useEffect(() => {
    fetch(`${BASE_URL_2}/?name=${search}`)
      .then((res) => res.json())
      .then((results) => {
        const data = results.results;
        setSearchLocation(data);
      });
  }, [searchLocation]);

  const isSearch = search !== null && !searchCharacter?.length;
  const isSearchLocation = searchLocation !== null && !searchLocation?.length;

  if (isSearch) {
    return (
      <>
        <CharacterSearch />
        <div className="container my-5">
          <div className="alert d-flex flex-row" role="alert">
            <RiErrorWarningLine size={35} color="red" className="me-3" />
            <h2>There is no such character...</h2>
          </div>
        </div>

        
      </>
    );
  }

  return (
    <>
      <CharacterSearch />
      <div className="container">
        <div className="row row-cols-xs-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-4">
          {searchCharacter
            .filter((character) =>
              character.name.toLowerCase().includes(search)
            )
            .map((item) => (
              <div className="col-md-4 py-3" key={item.id}>
                <CharacterCard
                  key={item.id}
                  id={item.id}
                  image={item.image}
                  name={item.name}
                />
              </div>
            ))}
        </div>
      </div>
   
      
    </>
    
  );
};

export default Search;
