import Card from "./Card";
import { IPropertiesCard } from "../HomePage";

interface IPropType{
  props:{
   data: IPropertiesCard[],
   handleRemoveCart:(title:string) => void;
   handleUpdate:(id:number, updateItems:IPropertiesCard) => void;
  }
  
}

function CardList({props}: IPropType) {
  return (
    <div className="mb-5">
      {/* Map over the data array and render a Card component for each item */}
      {props.data.map((item:IPropertiesCard) => (
        <Card key={item.id} item={item} handleRemoveCart={props.handleRemoveCart} handleUpdate={props.handleUpdate}/>
      ))}
    </div>
  );
}

export default CardList;
