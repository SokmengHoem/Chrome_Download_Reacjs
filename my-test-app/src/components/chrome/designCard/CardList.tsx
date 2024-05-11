
import { IPropertiesCard } from "../../../@types/@type.chrome";
import { useChrome } from "../../../contexts/ChromeContext";
import Card from "./Card";

function CardList() {
  const  {newData} = useChrome()
  //console.log(data)
  return (
    <div className="mb-5">
      {/* //Map over the data array and render a Card component for each item */}
      {newData.map((item:IPropertiesCard) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
}

export default CardList;
