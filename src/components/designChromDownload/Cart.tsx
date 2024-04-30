
import { MdClear } from "react-icons/md";


interface ItemProps {
    data: any;
}


const Cart: React.FC<ItemProps> = ({data}:ItemProps) => {

  return (
    <div className=" mb-5">
      {data.map((item:any) => {
        return (
          <div className=" w-[48%] mx-auto flex flex-col gap-3" key={item.id}>
            <h1 className=" mt-5">{item.downloadDate}</h1>
            <div className=" w-full flex justify-between border-2 rounded-xl  shadow-md">
              <div className="w-[15%] border-r-2 flex justify-center items-center">
                <img src={`/images/${item.image}`} alt="" className=" w-14 h-14 " />
              </div>
              <div className="w-[78%] py-3 px-4 ">
                <h1 className=" text-blue-600 underline cursor-pointer">
                  {item.title}
                </h1>
                <p className=" mt-2 text-gray-600 text-sm cursor-pointer mb-5">
                  {item.url_ref}
                </p>
                <p className=" text-blue-600 underline cursor-pointer mb-2 text-sm">
                  {item.show_download}
                </p>
              </div>
              <div className="w-[12%]  flex justify-end mt-3 mr-4">
                <div className=" h-6 rounded-full hover:bg-gray-200">
                  <MdClear size={23} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cart;
