import { useState, useEffect, useContext } from "react";
import { SectionContext } from "../../contexts/SectionContext";

const AddSectionModal = ({ marketId, marketName, sections }) => {
  const [sectionName, setSectionName] = useState("");
  const [sectionType, setSectionType] = useState("");
  const { addSection } = useContext(SectionContext);

  useEffect(() => {
    const existingSectionNumbers = sections.map((sec) =>
      parseInt(sec.sectionName.replace("R", ""))
    );
    const maxSectionNumber = Math.max(...existingSectionNumbers, 0);
    setSectionName(`R${maxSectionNumber + 1}`);
  }, [sections]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSection = {
      id: String(Date.now()),
      sectionName,
      sectionType,
      products: [],
    };
    addSection(marketId, newSection);
    setSectionType("");
    const modalElement = document.getElementById("addSectionModal");
    const bootstrapModal = window.bootstrap.Modal.getInstance(modalElement);
    bootstrapModal.hide();
  };

  return (
    <div
      className="modal fade"
      id="addSectionModal"
      tabIndex="-1"
      aria-labelledby="addSectionModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="addSectionModalLabel">
              Reyon Ekleme
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="sectionName" className="form-label">
                  Reyon Adı
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="sectionName"
                  value={sectionName}
                  disabled
                />
              </div>
              <div className="mb-3">
                <label htmlFor="sectionType" className="form-label">
                  Reyon Türü
                </label>
                <select
                  className="form-select"
                  id="sectionType"
                  value={sectionType}
                  onChange={(e) => setSectionType(e.target.value)}
                  required
                >
                  <option value="">Reyon Türünü Seçiniz</option>
                  <option value="Gıda">Gıda</option>
                  <option value="Temizlik">Temizlik</option>
                  <option value="Kırtasiye">Kırtasiye</option>
                  <option value="Kozmetik">Kozmetik</option>
                  <option value="Elektronik">Elektronik</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="marketName" className="form-label">
                  Market Adı
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="marketName"
                  value={marketName}
                  disabled
                />
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

export default AddSectionModal;
