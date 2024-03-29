import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../style.css";
//icons
import { AiOutlineSearch, AiOutlineCloseCircle } from "react-icons/ai";

function CharacterSearch(props) {
  const location = useLocation();
  const navigate = useNavigate();

  const urlParams = new URLSearchParams(location.search);
  const [UrlQ, setUrlQ] = useState(urlParams.get("name"));

  function formHandler(event) {
    event.preventDefault();
    const inputValue = event.target.name.value;
    if (inputValue === "") return false;
    setUrlQ(inputValue);
    navigate(`/search?name=${inputValue.toLowerCase()}`);
  }

  useEffect(() => {
    if (location?.search?.length === 0) {
      setUrlQ("");
    }
  }, [location, UrlQ]);

  const results = (
    <h4 className="text-orange fw-bold fs-3">Search character: "{UrlQ}" </h4>
  );

  return (
    <>
      <form onSubmit={formHandler}>
        <div className="mb-5 d-flex flex-row border px-2 py-3 rounded-5 shadow">
          <input
            name="name"
            type="text"
            className="form-control border-0 clear"
            id="search"
            defaultValue={UrlQ}
            placeholder="Search character or location..."
          />
          <button type="submit" className="btn">
            <AiOutlineSearch className="text-orange fw-bolder" size={25} />
          </button>
          <button type="reset" className="btn">
            <AiOutlineCloseCircle className="text-orange fw-bolder" size={25} />
          </button>
        </div>
      </form>
      {UrlQ && results}
    </>
  );
}

export default CharacterSearch;
