import React, { createContext, useContext, useState } from "react";
import { ICardType, IPropertiesCard } from "../@types/@type.chrome";

const ChromeContext = createContext<ICardType | null>(null);

interface Props {
  children: React.ReactNode;
}

export const ChromeProvider: React.FC<Props> = ({ children }) => {
  const [data, setData] = useState<IPropertiesCard[]>([]);
  const [filename, setFilename] = useState<string>("");
  const [creator, setCreator] = useState<string>("");
  const [image, setImage] = useState<string | undefined>("");
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [buttonIcon, setButtonIcon] = useState<boolean>(false);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");

  const handleFilenameChange = (value: string) => {
    setFilename(value);
  };

  const handleCreatorChange = (value: string) => {
    setCreator(value);
  };

  const handleImageChange = (value: string) => {
    setImage(value);
  };

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  const handleShowPopup = (isPopup: boolean) => {
    setShowPopup(isPopup);
  };
  const handleSubmit = (newCard: IPropertiesCard) => {
    if (buttonIcon) {
      const updateCard: any = data.map((item) => {
        if (item.id === selectedItemId) {
          return {
            ...item,
            filename: newCard.filename,
            creator: newCard.creator,
            image: newCard.image,
            borderColor: "",
          };
        }
        return item;
      });
      setData(updateCard);
    } else {
      setData((prev) => {
        return [...prev, newCard];
      });
    }
    setButtonIcon(false);
  };

  const handleUpdate = (id: number, itemCard: IPropertiesCard) => {
    console.log(itemCard);
    setFilename(itemCard.filename);
    setCreator(itemCard.creator);
    setImage(itemCard.image);
    setSelectedItemId(itemCard.id);

    setData(
      data.map((item) => ({
        ...item,
        borderColor: item.id === id ? "border-blue-700" : "",
      }))
    );
    setButtonIcon(true);
  };

  const handleRemoveCart = (value: string) => {
    if (!value.trim()) {
      alert("Value is empty!");
      return; // exit the function early if value is empty
    }
    if (!data.some(item => item.filename.trim() === value.trim())) {
      alert(`"${value}" not  found in data!`);
      return; // exit the function early if value doesn't exist
    }
    setData((prev) => {
      return prev.filter((item) => item.filename.trim() !== value.trim());
    });
  };

  const handleFilter = () => {
    let filtered = data;
    if (searchValue !== "") {
      filtered = data.filter(
        (item) =>
          item.filename.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.creator.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
    return filtered;
  };

  const newData = handleFilter();

  return (
    <ChromeContext.Provider
      value={{
        newData,
        showPopup,
        buttonIcon,
        handleShowPopup,
        filename,
        creator,
        image,
        handleFilenameChange,
        handleCreatorChange,
        handleImageChange,
        handleSubmit,
        handleRemoveCart,
        selectedItemId,
        handleUpdate,
        handleSearch,
      }}
    >
      {children}
    </ChromeContext.Provider>
  );
};

export const useChrome = () => {
  const context = useContext(ChromeContext);
  if (!context) {
    throw new Error("useChrome must be used within a ChromeProvider");
  }
  return context;
};
