import { useState, createContext, useEffect } from "react";
import axios from "axios";

export const MarketContext = createContext();

export const MarketProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const savedItems = localStorage.getItem("items");
    if (savedItems) {
      setItems(JSON.parse(savedItems));
      setLoading(false);
    } else {
      const fetchData = async () => {
        try {
          const response = await axios.get("/data.json");
          setItems(response.data);
          localStorage.setItem("items", JSON.stringify(response.data));
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      };
      fetchData();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const values = {
    items,
    loading,
    setItems,
    error,
    searchTerm,
    setSearchTerm,
  };

  return (
    <MarketContext.Provider value={values}>{children}</MarketContext.Provider>
  );
};
