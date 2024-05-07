import { Button, Form, Input, Modal, Space } from "antd";
import { useState } from "react";
import { IPropertiesCard } from "../HomePage";
import { MdClear } from "react-icons/md";

interface CardProps {
  item: IPropertiesCard;
  handleRemoveCart: (title: string) => void;
  handleUpdate: (id: number, updateItems: IPropertiesCard) => void;
}

function Card({ item, handleRemoveCart, handleUpdate }: CardProps) {
  const currentTime = new Date().toLocaleString();
  
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [form] = Form.useForm();

  const handleShowConfirm = () => {
    setOpenModal(true);
  };

  const handleRemove = () => {
    handleRemoveCart(title);
  };

  return (
    <div className=" mb-8">
      <div className="w-[48%] mx-auto flex flex-col gap-3">
        <div
          className={`w-full flex justify-between border-2 rounded-xl shadow-md ${item.borderColor}`}
        >
          <div
            className="w-[15%] border-r-2 flex justify-center items-center"
            onClick={() => handleUpdate(item.id, item)}
          >
            {item.image && typeof item.image === "string" && (
              <img src={item.image} alt="Uploaded" className="w-14 h-14" />
            )}
          </div>
          <div
            className="w-[78%] py-3 px-4"
            onClick={() => handleUpdate(item.id, item)}
          >
            <h1 className="text-blue-600 underline cursor-pointer">
              {item.filename}
            </h1>
            <p className="mt-2 text-gray-600 text-sm cursor-pointer mb-2 font-semibold">
              {item.creator}
            </p>
            <p className="text-gray-600  cursor-pointer mb-2 text-sm">
              Data: {currentTime}
            </p>
            <p className="text-blue-600 underline cursor-pointer mb-2 text-sm">
              Show folder
            </p>
          </div>
          <div className="w-[12%] flex justify-end mt-3 mr-4">
            <div className="h-6 rounded-full hover:bg-gray-200">
              <MdClear size={23} onClick={handleShowConfirm} />
            </div>
            <Modal open={openModal} onCancel={() => setOpenModal(false)} footer>
              <h1 className=" text-xl font-semibold mb-5">
                Are you sure you want to delete this item?
              </h1>
              <div>
                <Input
                  type="text"
                  name="title"
                  placeholder="Please input filename"
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className=" border-2 w-[100%] py-2 px-2 rounded-xl outline-blue-600"
                />
              </div>
              <div className="flex justify-end mt-5">
                <Space>
                  <Button
                    type="primary"
                    onClick={() => {
                      form.resetFields();
                      setOpenModal(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button danger onClick={handleRemove}>
                    Comfirm
                  </Button>
                </Space>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
