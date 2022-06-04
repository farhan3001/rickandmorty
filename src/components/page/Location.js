import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// api
import BASE_URL from "../../api_location.js";
//style
import "../../style.css";
//components
import Pagination from "../Pagination";
//icons
import { GiPerson } from "react-icons/gi";
import { BsFillRecordFill } from "react-icons/bs";
import { RiAliensFill } from "react-icons/ri";
import SearchLocation from './SearchLocation'
import CharacterCard from '../base/CharacterCard';


function Location({}) {
  const navigate = useNavigate();
  const [characters, setCharacters] = useState([]);
  const [results, setResults] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = results?.pages;
  const pageNumbers = [];
  const size = 4;

  useEffect(() => {
      fetch(`${BASE_URL}`)
          .then((response) => response.json())
          .then(results => {
              const data = results.results;
              setCharacters(data);
          });
  }, []);

  for (let i = 1; i <= totalPage; i++) {
    pageNumbers.push(i);
  }

  //change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
            <th scope="col">Name</th>
            <th scope="col">Type</th>
            <th scope="col">Dimension</th>
          </tr>
        </thead>
        <tbody>
          {characters.map((item) => (
            <tr key={item.id}>
              <td>
                <Link
                  className="text-decoration-none fw-bold text-info"
                  to={`${item.id}`}
                >
                  {item.name}
                </Link>
              </td>
              <td >
                {item.type}
              </td>
              <td className="text-center">{item.dimension}</td>
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

export default Location;
