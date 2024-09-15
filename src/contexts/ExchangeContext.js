import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ExchangeContext = createContext();

export const ExchangeProvider = ({ children }) => {
  const [exchangeRates, setExchangeRates] = useState({
    EUR: null,
    GBP: null,
    USD: null,
  });
  const API_URL = "https://v6.exchangerate-api.com/v6/7038118b3e0277f34137c04f/latest/TRY";

  const fetchExchangeRates = async () => {
    try {
      const response = await axios.get(API_URL);
      const data = response.data;
      const ratesInTL = {
        EUR: (1 / data.conversion_rates.EUR).toFixed(4),
        GBP: (1 / data.conversion_rates.GBP).toFixed(4),
        USD: (1 / data.conversion_rates.USD).toFixed(4),
      };

      setExchangeRates(ratesInTL);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchExchangeRates();
    const intervalId = setInterval(fetchExchangeRates, 30000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <ExchangeContext.Provider value={exchangeRates}>
      {children}
    </ExchangeContext.Provider>
  );
};
