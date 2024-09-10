import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/CitiesTable.css';

const CitiesTable = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const lastCityRef = useRef();

  const fetchCities = async (searchTerm, page) => {
    setLoading(true);
    try {
      const response = await axios.get(
        'https://public.opendatasoft.com/api/records/1.0/search/', 
        {
          params: {
            dataset: 'geonames-all-cities-with-a-population-1000',
            q: searchTerm,
            rows: 10,
            start: (page - 1) * 10,
            facet: ['timezone', 'cou_name_en'],
          }
        }
      );
      const newCities = response.data.records;
      setCities((prevCities) => [...prevCities, ...newCities]);
      setHasMore(newCities.length > 0);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch cities data');
      setLoading(false);
    }
  };

  const handleObserver = useCallback(
    (entities) => {
      const target = entities[0];
      if (target.isIntersecting && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    },
    [hasMore]
  );

  useEffect(() => {
    fetchCities(searchTerm, page);
  }, [searchTerm, page]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    };

    const currentObserver = new IntersectionObserver(handleObserver, options);
    const currentRef = lastCityRef.current;

    if (currentRef) {
      currentObserver.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        currentObserver.unobserve(currentRef);
      }
    };
  }, [handleObserver, loading]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCities([]);
    setPage(1); // Reset to page 1 when search changes
  };

  if (loading && page === 1) return <p>Loading cities...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Cities List</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search cities..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>City Name</th>
            <th>Country</th>
            <th>Timezone</th>
          </tr>
        </thead>
        <tbody>
          {cities.map((city, index) => (
            <tr key={city.recordid} ref={index === cities.length - 1 ? lastCityRef : null}>
              <td>
                <Link to={`/weather/${city.fields.name}`} target="_blank">
                  {city.fields.name}
                </Link>
              </td>
              <td>{city.fields.cou_name_en}</td>
              <td>{city.fields.timezone}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && <p>Loading more cities...</p>}
    </div>
  );
};

export default CitiesTable;
