import { useContext, useState, useEffect } from "react";
import Card from "./Card";
import AddSectionModal from "./modals/AddSectionModal";
import AddProductModal from "./modals/AddProductModal";
import EditProductModal from "./modals/EditProductModal";
import { MarketContext } from "../contexts/MarketContext";
import { SectionContext } from "../contexts/SectionContext";

const Content = () => {
  const { items, loading, error, searchTerm } = useContext(MarketContext);
  const { deleteSection } = useContext(SectionContext);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [currentMarket, setCurrentMarket] = useState(null);
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [showNoProductsAlert, setShowNoProductsAlert] = useState(false);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowEditProductModal(true);
  };

  const handleAddProduct = (section) => {
    setSelectedSection(section);
  };

  const handleAddSectionClick = (market) => {
    setCurrentMarket(market);
  };

  const closeModal = () => {
    setSelectedSection(null);
    setCurrentMarket(null);
    setShowEditProductModal(false);
  };

  useEffect(() => {
    const hasProducts = items.some(market =>
      market.sections.some(section =>
        section.products.some(product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    );
    setShowNoProductsAlert(!hasProducts && searchTerm.trim() !== "");
  }, [items, searchTerm]);

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>Hata: {error.message}</div>;

  const filteredItems = items.map(market => ({
    ...market,
    sections: market.sections
      .map(section => ({
        ...section,
        products: section.products.filter(product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      }))
      .filter(section => section.products.length > 0 || searchTerm.trim() === "")
  })).filter(market => market.sections.length > 0);

  return (
    <div className="row mt-4">
      {showNoProductsAlert && (
        <div className="alert alert-warning">
          Ürün bulunamadı.
        </div>
      )}
      {filteredItems.length === 0 && searchTerm.trim() === "" ? (
        items.map((market) => (
          <div key={market.id} className="col-12 col-lg-6 mb-3">
            <Card
              market={market}
              handleProductClick={handleProductClick}
              handleAddProduct={handleAddProduct}
              handleAddSectionClick={handleAddSectionClick}
              deleteSection={deleteSection}
            />
          </div>
        ))
      ) : (
        filteredItems.map((market) => (
          <div key={market.id} className="col-12 col-lg-6 mb-3">
            <Card
              market={market}
              handleProductClick={handleProductClick}
              handleAddProduct={handleAddProduct}
              handleAddSectionClick={handleAddSectionClick}
              deleteSection={deleteSection}
            />
          </div>
        ))
      )}
      <div className="d-flex justify-content-end my-3">
        <button className="btn btn-lg btn-gray me-3">Kaydet</button>
      </div>

      <AddSectionModal
        marketId={currentMarket?.id}
        marketName={currentMarket?.marketName}
        sections={currentMarket?.sections || []}
        closeModal={closeModal}
      />
      <AddProductModal selectedSection={selectedSection} closeModal={closeModal} />
      <EditProductModal
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        showModal={showEditProductModal}
        setShowModal={setShowEditProductModal}
      />
    </div>
  );
};

export default Content;
