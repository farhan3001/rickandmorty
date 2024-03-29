import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import BASE_URL from "../../api.js";
import BASE_URL_2 from "../../api_location";
//icons
import { BsFillRecordFill } from "react-icons/bs";
import { IoMdMale, IoMdFemale } from "react-icons/io";
import { GiPerson } from "react-icons/gi";
import { RiAliensFill } from "react-icons/ri";
import { HiLocationMarker } from "react-icons/hi";
import { AiOutlinePlus} from "react-icons/ai";
import {db} from '../../firebase.js';
import { collection, getDocs, addDoc, updateDoc, doc } from "firebase/firestore";

export default function CharacterDetail() {
  const navigate = useNavigate();
  const [results, setResults] = useState();
  const params = useParams();
  const [products, setProducts] = useState([]);
  const episodes = products.episode;
  const episodeArr = [];
  const { characterId } = params;

  episodes?.forEach((item) => {
    episodeArr.push({
      episodeURL: item,
      episodeNum: item.split("api/")[1].split("/")[1],
    });
  });

  
  useEffect(() => {
    async function fetchInfo() {
      fetch(`${BASE_URL}/${characterId}`)
      .then((response) => response.json())
      .then((result) => {
        setProducts(result);
      });
    }
    fetchInfo();
  }, []);

  const setStatus = () => {
    if (products.status === "Alive") {
      return " text-success border rounded border-success";
    } else if (products.status === "unknown") {
      return " text-warning border rounded border-warning";
    }
    return " text-danger border rounded border-danger";
  };

  const setSpecies = () => {
    const size = 25;

    if (products.species === "Alien") {
      return <RiAliensFill size={size} className="me-2" />;
    }
    return <GiPerson size={size} className="me-2" />;
  };

  const setGender = () => {
    if (products.gender === "Female") {
      return <IoMdFemale className="me-2" />;
    }
    return <IoMdMale className="me-2" />;
  };

  return (
    <div className="container">
      <div className="row my-5">
        <div className="character-image col-md-12 col-lg-6 mb-5">
          <img
            src={products.image}
            className="rounded shadow w-100"
            alt={products.name}
          />
        </div>
        <div className="character-info col-md-12 col-lg-5 ms-5">
          <h1 className="text-orange fw-bold mb-5 display-4">
            {products.name}
          </h1>
          <div className="d-flex flex-row">
            <div
              className={
                "d-flex flex-row align-items-center px-2 py-1 rounded fs-5" +
                setStatus()
              }
            >
              <BsFillRecordFill className="me-1" />
              {products.status}
            </div>
            <div className="species d-flex flex-row align-items-center ms-4 px-2 py-1 rounded fs-5 bg-success text-light">
              {setSpecies()}
              {products.species}
            </div>
          </div>
          <p className="fs-4 d-flex flex-row align-items-center my-4">
            {setGender()}
            {products.gender}
          </p>

         
          <p className="fs-4 mb-5 d-flex flex-row align-items-center flex-wrap">
            <HiLocationMarker className="me-2" />{" "}
            <span className="me-2">Last known location: </span>
            
            <a
              className="text-info text-decoration-none fw-bold"
              href={products?.location?.url}
              target="_blank"
            >
              {products?.location?.name}
            </a>
          </p>

          <div className="dropdown">
            <button
              className="btn btn-dark text-light fs-5 d-flex flex-row justify-content-between align-items-center dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Episodes where {products.name} appears
            </button>
            <ul
              className="dropdown-menu scrollable-menu w-75"
              aria-labelledby="dropdownMenuButton1"
            >
              {episodeArr?.map((item, index) => (
                <li className="dropdown-item" key={index}>
                  <a
                    className="text-decoration-none text-dark fs-5 "
                    target="_blank"
                    href={item.episodeURL}
                  >
                    Episode {item.episodeNum}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          
        </div>
      </div>
    </div>
  );
}
