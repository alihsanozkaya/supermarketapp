import { createContext, useContext } from "react";
import { MarketContext } from "./MarketContext";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const { setItems } = useContext(MarketContext);

  const addProduct = (sectionId, product) => {
    setItems((prevItems) =>
      prevItems.map((item) => ({
        ...item,
        sections: item.sections.map((section) =>
          section.id === sectionId
            ? { ...section, products: [...section.products, product] }
            : section
        ),
      }))
    );
  };

  const editProduct = (sectionId, updatedProduct) => {
    setItems((prevItems) =>
      prevItems.map((item) => ({
        ...item,
        sections: item.sections.map((section) =>
          section.id === sectionId
            ? {
                ...section,
                products: section.products.map((product) =>
                  product.id === updatedProduct.id ? updatedProduct : product
                ),
              }
            : section
        ),
      }))
    );
  };

  const deleteProduct = (marketId, sectionId, productId) => {
    setItems((prevItems) =>
      prevItems.map((market) =>
        market.id === marketId
          ? {
              ...market,
              sections: market.sections.map((section) =>
                section.id === sectionId
                  ? {
                      ...section,
                      products: section.products.filter(
                        (product) => product.id !== productId
                      ),
                    }
                  : section
              ),
            }
          : market
      )
    );
  };

  const moveProduct = (
    oldMarketId,
    oldSectionId,
    productId,
    newMarketId,
    newSectionId
  ) => {
    setItems((prevItems) => {
      let productToMove = null;

      const updatedItems = prevItems.map((market) => {
        if (market.id === oldMarketId) {
          return {
            ...market,
            sections: market.sections.map((section) => {
              if (section.id === oldSectionId) {
                productToMove = section.products.find(
                  (product) => product.id === productId
                );
                return {
                  ...section,
                  products: section.products.filter(
                    (product) => product.id !== productId
                  ),
                };
              }
              return section;
            }),
          };
        }
        return market;
      });

      if (productToMove) {
        return updatedItems.map((market) => {
          if (market.id === newMarketId) {
            return {
              ...market,
              sections: market.sections.map((section) => {
                if (section.id === newSectionId) {
                  return {
                    ...section,
                    products: [...section.products, productToMove],
                  };
                }
                return section;
              }),
            };
          }
          return market;
        });
      }
      return updatedItems;
    });
  };

  const values = {
    addProduct,
    editProduct,
    deleteProduct,
    moveProduct,
  };

  return (
    <ProductContext.Provider value={values}>{children}</ProductContext.Provider>
  );
};
