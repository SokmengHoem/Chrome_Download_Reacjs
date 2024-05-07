import { useState } from "react";
import NavBar from "./header/NavBar";
import FloatingButton from "./modal/FloatingButton";
import PopUp from "./modal/PopUp";
import CardList from "./designCard/CardList";

export interface IPropertiesCard {
  id: number;
  filename: string;
  creator: string;
  image?: string;
  borderColor?: string;
}

export default function HomePage() {
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [formData, setFormData] = useState<IPropertiesCard[]>([]);
  const [filename, setFilename] = useState<string>("");
  const [creator, setCreator] = useState<string>("");
  const [image, setImage] = useState<string|undefined>("");
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [buttonIcon, setButtonIcon] = useState<boolean>(false);
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
  const handleShowPopup = (isPopup: boolean) => {
    //toggle
    //setShowPopup(prev => !prev);
    setShowPopup(isPopup);
  };

  const handleFormSubmit = (newFormData: IPropertiesCard) => {
    if (buttonIcon) {
      // If in update mode, find the item in data and update it
      const updatedData = formData.map((item) => {
        if (item.id === selectedItemId) {
          return {
            ...item,
            filename: filename,
            creator: creator,
            image: image,
            borderColor: "",
          };
        }
        return item;
      });
      setFormData(updatedData);
    } else {
      // If in add mode, add a new item to data
      setFormData((prev) => [...prev, newFormData]);
    }
    setButtonIcon(false);
  };

  const handleRemoveCart = (title: string) => {
    const updatedData = formData.filter((item) => item.filename !== title);

    if (updatedData.length === formData.length) {
      // No item with the provided title was found
      alert(`The item "${title}" does not exist in the cart.`);
    } else {
      // Item was successfully removed, update the state
      setFormData(updatedData);
    }
  };

  const handleUpdate = (id: number, updateItem: IPropertiesCard) => {
    //Set data to form
    setCreator(updateItem.creator);
    setFilename(updateItem.filename);
    setImage(updateItem.image);
    setSelectedItemId(id);

    setFormData(
      formData.map((item) => ({
        ...item,
        borderColor: item.id === id ? "border-blue-700" : "",
      }))
    );
    setButtonIcon(true);
  };

  const handleFilter = () => {
    let filtered = formData;
    if (searchValue !== "") {
      // setFilteredData(formData);
      filtered = filtered.filter((item) => item.filename.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())||
      item.creator.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
    }
    return filtered;
  };

  const newData = handleFilter();

  return (
    <div className=" flex flex-col gap-16 ">
      <NavBar handleSearch={setSearchValue} />
      {/* modal */}
      <FloatingButton
        handleShowPopup={handleShowPopup}
        buttonIcon={buttonIcon}
      />
      <div className=" absolute left-0 bottom-0">

      </div>
      <PopUp
        showPopup={showPopup}
        onClickClosePop={handleShowPopup}
        onSubmit={handleFormSubmit}
        filename={filename}
        creator={creator}
        image={image}
        buttonIcon={buttonIcon}
        handleFilenameChange={handleFilenameChange}
        handleCreatorChange={handleCreatorChange}
        handleImageChange={handleImageChange}
      />
      {/* CardList */}
      <CardList
        props={{
          data: newData,
          handleRemoveCart: handleRemoveCart,
          handleUpdate: handleUpdate,
        }}
      />
    </div>
  );
}
