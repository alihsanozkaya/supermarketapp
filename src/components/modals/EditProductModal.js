import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../../contexts/ProductContext";
import { MarketContext } from "../../contexts/MarketContext";

const EditProductModal = ({
  selectedProduct,
  setSelectedProduct,
  showModal,
  setShowModal,
}) => {
  const { editProduct, deleteProduct, moveProduct } = useContext(ProductContext);
  const { items } = useContext(MarketContext);
  const [filteredSections, setFilteredSections] = useState([]);
  const [selectedMarketId, setSelectedMarketId] = useState("");
  const [selectedSectionId, setSelectedSectionId] = useState("");

  useEffect(() => {
    if (selectedProduct) {
      const currentSection = items
        .flatMap((item) => item.sections)
        .find((section) =>
          section.products.some((product) => product.id === selectedProduct.id)
        );
      if (currentSection) {
        const market = items.find((item) =>
          item.sections.some((sec) => sec.id === currentSection.id)
        );
        if (market) {
          setSelectedMarketId(market.id);
          setSelectedSectionId(currentSection.id);
        }
        const filtered =
          items
            .find((item) => item.id === market?.id)
            ?.sections.filter(
              (sec) => sec.sectionType === currentSection.sectionType
            ) || [];
        setFilteredSections(filtered);
      }
    }
  }, [selectedProduct, items]);

  useEffect(() => {
    if (selectedMarketId) {
      const selectedMarket = items.find((item) => item.id === selectedMarketId);
      if (selectedMarket) {
        const filtered = selectedMarket.sections.filter(
          (sec) =>
            sec.sectionType ===
            items
              .flatMap((item) => item.sections)
              .find((sec) =>
                sec.products.some(
                  (product) => product.id === selectedProduct.id
                )
              ).sectionType
        );
        setFilteredSections(filtered);
        setSelectedSectionId("");
      }
    }
  }, [selectedMarketId]);

  if (!selectedProduct || !showModal) return null;

  const handleSave = () => {
    const currentSection = items
      .flatMap((item) => item.sections)
      .find((section) =>
        section.products.some((product) => product.id === selectedProduct.id)
      );

    const market = items.find((item) =>
      item.sections.some((sec) => sec.id === currentSection?.id)
    );

    if (!currentSection || !market) {
      console.error("Ürün veya market bulunamadı.");
      return;
    }

    const hasMarketChanged = selectedMarketId && selectedMarketId !== market.id;
    const hasSectionChanged = selectedSectionId && selectedSectionId !== currentSection.id;

    if (hasMarketChanged || hasSectionChanged) {
      moveProduct(
        market.id,
        currentSection.id,
        selectedProduct.id,
        selectedMarketId,
        selectedSectionId
      );
    } else {
      editProduct(currentSection.id, {
        ...selectedProduct,
        name: selectedProduct.name,
      });
    }
    closeModal();
  };

  const handleDelete = () => {
    const currentSection = items
      .flatMap((item) => item.sections)
      .find((section) =>
        section.products.some((product) => product.id === selectedProduct.id)
      );

    const market = items.find((item) =>
      item.sections.some((sec) => sec.id === currentSection.id)
    );

    if (market && currentSection) {
      deleteProduct(market.id, currentSection.id, selectedProduct.id);
    } else {
      console.error("Ürün veya market bulunamadı.");
    }
    closeModal();
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const markets = items.map((item) => ({ id: item.id, name: item.marketName }));

  return (
    <div
      className={`modal fade ${showModal ? "show" : ""}`}
      style={{ display: showModal ? "block" : "none" }}
      aria-labelledby="editProductModalLabel"
      aria-hidden="true"
      role="dialog"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="editProductModalLabel">
              Ürün Düzenleme
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={closeModal}
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label htmlFor="productId" className="form-label">
                  Ürün ID
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="productId"
                  value={selectedProduct.id}
                  disabled
                />
              </div>
              <div className="mb-3">
                <label htmlFor="productName" className="form-label">
                  Ürün Adı
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="productName"
                  value={selectedProduct.name}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="sectionType" className="form-label">
                  Bulunduğu Reyon Türü
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="sectionType"
                  value={
                    items
                      .flatMap((item) => item.sections)
                      .find((section) =>
                        section.products.some(
                          (product) => product.id === selectedProduct.id
                        )
                      )?.sectionType || ""
                  }
                  disabled
                />
              </div>
              <div className="mb-3">
                <label htmlFor="selectionMarket" className="form-label">
                  Taşınacak Marketi Seçiniz
                </label>
                <select
                  className="form-select"
                  id="selectionMarket"
                  value={selectedMarketId}
                  onChange={(e) => setSelectedMarketId(e.target.value)}
                >
                  <option value="">Market Seçiniz</option>
                  {markets.map((market) => (
                    <option key={market.id} value={market.id}>
                      {market.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="selectionSection" className="form-label">
                  Taşınacak Reyonu Seçiniz
                </label>
                <select
                  className="form-select"
                  id="selectionSection"
                  value={selectedSectionId}
                  onChange={(e) => setSelectedSectionId(e.target.value)}
                >
                  <option value="">Reyon Seçiniz</option>
                  {filteredSections.map((sec) => (
                    <option key={sec.id} value={sec.id}>
                      {sec.sectionName}
                    </option>
                  ))}
                </select>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={handleDelete}
            >
              Ürünü Sil
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
            >
              Kaydet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;
