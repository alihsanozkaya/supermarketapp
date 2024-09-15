import { useContext, useState } from "react";
import { FaBars, FaSearch } from "react-icons/fa";
import { ExchangeContext } from "../contexts/ExchangeContext";
import { MarketContext } from "../contexts/MarketContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const exchangeRates = useContext(ExchangeContext);
  const { searchTerm, setSearchTerm } = useContext(MarketContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="container-fluid py-2 bg-gray position-relative">
      <div className="row align-items-center justify-content-between">
        <div className="col-6 col-md-4 d-flex align-items-center">
          <img className="my-2" src="/marketLogo.png" alt="Market Logo" style={{ width: 40 }} />
          <h5 className="ms-2">Supermarket App</h5>
        </div>

        <div className="col-6 d-md-none d-flex justify-content-end">
          <button className="btn" onClick={toggleMenu}>
            <FaBars size={24} />
          </button>
        </div>

        <div className="col-12 col-md-4 d-none d-md-flex justify-content-center my-2 my-md-0">
          <div className="border border-3 border-success bg-light p-1 mx-2" style={{ overflow: "hidden" }}>
            $ {exchangeRates.USD ? exchangeRates.USD : '0'}
          </div>
          <div className="border border-3 border-success bg-light p-1 mx-2" style={{ overflow: "hidden" }}>
            £ {exchangeRates.GBP ? exchangeRates.GBP : '0'}
          </div>
          <div className="border border-3 border-success bg-light p-1 mx-2" style={{ overflow: "hidden" }}>
            € {exchangeRates.EUR ? exchangeRates.EUR : '0'}
          </div>
        </div>

        <div className="col-12 col-md-4 d-none d-md-flex justify-content-end">
          <div className="input-group" style={{ maxWidth: 200 }}>
            <span className="input-group-text bg-light border-0">
              <FaSearch size={20} />
            </span>
            <input
              className="form-control border-start-0"
              placeholder="Ürün Ara"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="d-md-none position-absolute end-0 w-25 bg-gray mt-1 p-1">
          <div className="text-center">
            <div className="align border border-3 border-success bg-light p-1 mx-auto" style={{ overflow: "hidden", maxWidth: 85 }}>
              $ {exchangeRates.USD ? exchangeRates.USD : '0'}
            </div>
            <div className="border border-3 border-success bg-light p-1 mx-auto mt-2" style={{ overflow: "hidden", maxWidth: 85 }}>
              £ {exchangeRates.GBP ? exchangeRates.GBP : '0'}
            </div>
            <div className="border border-3 border-success bg-light p-1 mx-auto mt-2" style={{ overflow: "hidden", maxWidth: 85 }}>
              € {exchangeRates.EUR ? exchangeRates.EUR : '0'}
            </div>
          </div>
          <div className="input-group mt-2">
            <input
              className="form-control border-start-0 w-50"
              placeholder="Ürün Ara"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
