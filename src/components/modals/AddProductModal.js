import { useState, useContext, useEffect } from "react";
import { ProductContext } from "../../contexts/ProductContext";

const AddProductModal = ({ selectedSection, closeModal }) => {
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const { addProduct } = useContext(ProductContext);

  useEffect(() => {
    const modalElement = document.getElementById("addProductModal");
    const bootstrapModal = new window.bootstrap.Modal(modalElement);

    return () => {
      bootstrapModal.hide();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedSection) return;
    const newProduct = { id: productId, name: productName };
    addProduct(selectedSection.id, newProduct);
    setProductId("");
    setProductName("");
    const modalElement = document.getElementById("addProductModal");
    const bootstrapModal = window.bootstrap.Modal.getInstance(modalElement);
    bootstrapModal.hide();
  };

  return (
    <div
      className="modal fade"
      id="addProductModal"
      tabIndex="-1"
      aria-labelledby="addProductModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addProductModalLabel">
              Ürün Ekleme
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={closeModal}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="productId" className="form-label">
                  Ürün ID
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="productId"
                  value={productId}
                  onChange={(e) => setProductId(e.target.value)}
                  placeholder="Ürün ID giriniz"
                  required
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
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="Ürün Adı Giriniz"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="section" className="form-label">
                  Eklenecek Reyon
                </label>
                <select
                  className="form-select"
                  id="section"
                  value={selectedSection?.sectionName || ""}
                  disabled
                >
                  <option value={selectedSection?.sectionName}>
                    {selectedSection?.sectionName}
                  </option>
                </select>
              </div>
              <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary">
                  Ekle
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
