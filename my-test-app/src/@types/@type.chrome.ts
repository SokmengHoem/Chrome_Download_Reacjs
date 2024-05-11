
export interface IPropertiesCard {
  id: number;
  filename: string;
  creator: string;
  image?: string;
  borderColor?: string;
}

export interface ICardType{
    newData:IPropertiesCard[];
    showPopup: boolean;
    buttonIcon: boolean;
    filename:string;
    creator:string;
    image?:string;
    selectedItemId:number|null;
    handleShowPopup: (value:boolean) => void;
    handleFilenameChange: (value:string) => void;
    handleCreatorChange: (value:string) => void;
    handleImageChange: (value:string) => void;
    handleSubmit: (newData:IPropertiesCard) => void;
    handleRemoveCart: (value:string) => void;
    handleUpdate: (id:number, itemCard:IPropertiesCard) => void;
    handleSearch: (searchTerm: string) => void;
}