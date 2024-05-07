import { Button, Input, Modal, Space } from "antd";
import { useState, useEffect } from "react";
import { MdClear } from "react-icons/md";

interface ItemProps {
    data: any[];
    onDelete: (title:string) => void;
    onUpdate: (id:number, updateItems:any) => void;
}

const Cart: React.FC<ItemProps> = ({ data ,onDelete, onUpdate}: ItemProps) => {
    const [isOpenModal, setIsModalOpen] = useState<boolean>(false)
    const [title, setTitle] = useState<string>("")
    const [borderColor, setBorderColor] = useState<string>('');

    const handleShowConfirm = () => {
        setIsModalOpen(true);
    }

    const handleRemove = () => {
       onDelete(title.toLocaleLowerCase())
       setTitle("");
       setIsModalOpen(false);
    }

    const handleUpdate = (id:number, updateItems:number|string) => {
        setBorderColor('border-blue-700 ');
        onUpdate(id, updateItems)
    }

    return (
        <div className="mb-5">
            {data.map((item: any) => {
                return (
                    <div className="w-[48%] mx-auto flex flex-col gap-3" key={item.id}>
                        <h1 className="mt-5">{item.downloadDate}</h1>
                        <div className={`w-full flex justify-between border-2 rounded-xl shadow-md ${borderColor}`} onClick={()=>handleUpdate(item.id,item)}>
                            <div className="w-[15%] border-r-2 flex justify-center items-center">
                                {item.image && typeof item.image === 'string' && // Check if item.image exists and is a string
                                    <img src={item.image} alt="Uploaded" className="w-14 h-14" />
                                }
                            </div>
                            <div className="w-[78%] py-3 px-4 ">
                                <h1 className="text-blue-600 underline cursor-pointer">
                                    {item.filename}
                                </h1>
                                <p className="mt-2 text-gray-600 text-sm cursor-pointer mb-5 font-semibold">
                                    {item.creator}
                                </p>
                                <p className="text-blue-600 underline cursor-pointer mb-2 text-sm">
                                    Show folder
                                </p>
                            </div>
                            <div className="w-[12%] flex justify-end mt-3 mr-4">
                                <div className="h-6 rounded-full hover:bg-gray-200">
                                    <MdClear size={23} onClick={handleShowConfirm}/>
                                </div>
                                <Modal
                                open={isOpenModal}
                                onCancel={() =>setIsModalOpen(false)}
                                footer
                                >
                                   <h1 className=" text-xl font-semibold mb-5">Are you sure you want to delete this item?</h1>
                                   <div>
                                        <input type="text" name="title" placeholder="Please input filename" onChange={(e) => setTitle(e.target.value)}
                                        className=" border-2 w-[100%] py-2 px-2 rounded-xl outline-blue-600"
                                         />
                                   </div>
                                   <div className="flex justify-end mt-5">
                                       <Space>
                                       <Button type="primary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                                       <Button danger onClick={handleRemove}>Comfirm</Button>
                                       </Space>  
                                   </div>
                                </Modal>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Cart;

