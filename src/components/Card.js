import React from "react";
import { FaTrash } from "react-icons/fa";

const Card = ({
  market,
  handleProductClick,
  handleAddProduct,
  handleAddSectionClick,
  deleteSection,
}) => {
  return (
    <div className="bg-gray p-1">
      <h4 className="text-center">{market.marketName}</h4>
      <table
        className="table table-striped table-bordered"
        style={{ backgroundColor: "#C0C0C0" }}
      >
        <thead className="text-center">
          <tr>
            <th scope="col">Reyon</th>
            <th scope="col">Tür</th>
            <th scope="col">Ürünler</th>
            <th scope="col">
              <button
                className="btn btn-outline-primary"
                onClick={() => handleAddSectionClick(market)}
                data-bs-toggle="modal"
                data-bs-target="#addSectionModal"
              >
                Reyon Ekle
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {market.sections.map((section) => (
            <tr key={section.id}>
              <th scope="row">
                <div className="d-flex justify-content-center">
                  {section.sectionName}
                  <div
                    className="d-flex align-items-center"
                    style={{ cursor: "pointer" }}
                    onClick={() => deleteSection(market.id, section.id)}
                  >
                    <FaTrash className="ms-2" color="red" size={12} />
                  </div>
                </div>
              </th>
              <td className="text-center">{section.sectionType}</td>
              <td>
                <div className="d-flex flex-wrap gap-2">
                  {section.products.map((product) => (
                    <span
                      key={product.id}
                      className="badge bg-success border"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleProductClick(product)}
                    >
                      {product.name}
                    </span>
                  ))}
                </div>
              </td>
              <td className="d-flex justify-content-center">
                <button
                  className="btn btn-primary"
                  onClick={() => handleAddProduct(section)}
                  data-bs-toggle="modal"
                  data-bs-target="#addProductModal"
                >
                  Ürün Ekle
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Card;
