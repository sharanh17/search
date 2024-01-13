
import React, { useState, useEffect } from "react";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleSearch = async () => {
      try {
        if (inputValue.trim() === "") {
          setSearchResults([]);
          return;
        }

        const matchingCountries = countries.filter((country) =>
          country.name.common.toLowerCase().includes(inputValue.toLowerCase())
        );

        setSearchResults(matchingCountries.slice(0, 3));
      } catch (error) {
        console.error("Error fetching data:", error);
        setSearchResults([]);
      }
    };

    const timeoutId = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [inputValue, countries]);

  const cardStyle = {
    width: "200px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    margin: "10px",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  const containerStyle = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  const imageStyle = {
    width: "100px",
    height: "100px",
  };

  const style = {
    display: "flex",
    justifyContent: "center",
    margin: "50px",
  };

  return (
    <>
      <div>
        <input
          className={style}
          type="text"
          placeholder="Search for countries"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div style={containerStyle}>
          {(searchResults.length > 0 ? searchResults : countries).map(
            (country) => (
              <div key={country.alpha3Code} style={cardStyle}>
                {/* Access the 'common' property of the 'name' object */}
                <img
                  src={country.flags && country.flags.png}
                  alt={`${country.name?.common || "Unknown"} Flag`}
                  style={imageStyle}
                />
                <h2>{country.name?.common || "Unknown"}</h2>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}

