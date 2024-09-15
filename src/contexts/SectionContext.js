import React, { createContext, useContext } from "react";
import { MarketContext } from "./MarketContext";

export const SectionContext = createContext();

export const SectionProvider = ({ children }) => {
  const { setItems } = useContext(MarketContext);

  const addSection = (marketId, newSection) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === marketId
          ? { ...item, sections: [...item.sections, newSection] }
          : item
      )
    );
  };

  const deleteSection = (marketId, sectionId) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === marketId
          ? {
              ...item,
              sections: item.sections.filter(
                (section) => section.id !== sectionId
              ),
            }
          : item
      )
    );
  };

  const values = { addSection, deleteSection };

  return (
    <SectionContext.Provider value={values}>{children}</SectionContext.Provider>
  );
};
