import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// api
import BASE_URL from "../../api.js";
import BASE_URL_2 from "../../api_location.js";
//style
import "../../style.css";
//components
import Pagination from "../Pagination";
import { useParams } from "react-router-dom";

//icons
import { GiPerson } from "react-icons/gi";
import { BsFillRecordFill } from "react-icons/bs";
import { RiAliensFill } from "react-icons/ri";



function CharacterLocation({}) {
  const navigate = useNavigate();
  const params = useParams();
  const { locationId } = params;
  const [characters, setCharacters] = useState([]);
  const [locations, setLocations] = useState([]);
  const [results, setResults] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = results?.pages;
  const pageNumbers = [];
  const size = 4;

  useEffect(() => {
    fetch(`${BASE_URL_2}/${locationId}`)
        .then((response) => response.json())
        .then(results => {
            const data = results;
            setLocations(data.name);
            console.log(data.name);
        });
  }, []);


  for (let i = 1; i <= totalPage; i++) {
    pageNumbers.push(i);
  }

  //change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const setStatus = (item) => {
    if (item.status === "Alive") {
      return "text-success mx-1";
    } else if (item.status === "unknown") {
      return "text-warning mx-1";
    }
    return "text-danger mx-1";
  };

  const setSpecies = (item) => {
    const size = 25;
    if (item.species === "Alien") {
      return <RiAliensFill size={size} color="blue" />;
    }
    return <GiPerson size={size} />;
  };

  useEffect(() => {
    fetch(`${BASE_URL}?page=1`)
      .then((response) => response.json())
      .then((results) => {
        const data = results.results;
        setResults(results.info);
        setCharacters(data);
        navigate(`?page=1`);
      });
  }, []);

  useEffect(() => {
    fetch(`${BASE_URL}?page=${currentPage}`)
      .then((response) => response.json())
      .then((results) => {
        const data = results.results;
        setResults(results.info);
        setCharacters(data);
      });
  }, [currentPage]);

  
  return (
              
    <div className="container-fluid">
      <div> 
          <h1 className='text-center display-4 text-orange fw-bolder mb-5'>Rick and Morty</h1>
      </div>
      <table className="table text-center fs-4">
        <thead>
          <tr className="">
            <th scope="col">İmage</th>
            <th scope="col">Name</th>
            <th scope="col">Status</th>
            <th scope="col">Species</th>
          </tr>
        </thead>
        <tbody>
          {characters
            .filter((character) =>
              character.location.name == locations
            )
            .map((item) => (
            <tr key={item.id}>
              <td className="w-25">
                <img
                  src={item.image}
                  className="avatar img-avatar"
                  alt={item.name}
                />
              </td>
              <td>
                <Link
                  className="text-decoration-none fw-bold text-info"
                  to={`${item.id}`}
                >
                  {item.name}
                </Link>
              </td>
              <td className={setStatus(item)}>
                <BsFillRecordFill className={setStatus(item)} />
                {item.status}
              </td>
              <td className="text-center">{setSpecies(item)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        pageNumbers={pageNumbers}
        totalPage={totalPage}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}

export default CharacterLocation;
