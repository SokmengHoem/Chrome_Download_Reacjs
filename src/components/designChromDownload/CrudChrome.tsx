import React, { ChangeEvent, useState, useRef } from "react";
import NavBar from "./NavBar";
import { MdClear } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Button, Form, Input, Modal, Space } from "antd";
import { GrUpdate } from "react-icons/gr";

interface ItemDownload {
  id: number;
  downloadDate: String;
  filename: String;
  creator: String;
  image?: String;
}
const CrudChrome = () => {
  const [data, setData] = useState<ItemDownload[]>([]);
  const [date, setDate] = useState<string>("");
  const [filename, setFilename] = useState<string>("");
  const [creator, setCreator] = useState<string>("");
  const [img, setImg] = useState<string>("");
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [filteredData, setFilteredData] = useState<ItemDownload[]>([]);
  const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setImg(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (creator.length < 3) {
      alert("Creator must be at least 3 characters long");
      return;
    }

    if (isUpdateMode) {
      // If in update mode, find the item in data and update it
      const updatedData = data.map((item) => {
        if (item.id === selectedItemId) {
          return {
            ...item,
            filename: filename,
            creator: creator,
            downloadDate: date,
            image: img,
            borderColor: "",
          };
        }
        return item;
      });
      setData(updatedData);
    } else {
      // If in add mode, add a new item to data
      setData([
        ...data,
        {
          id: data.length + 1,
          downloadDate: date,
          filename: filename,
          creator: creator,
          image: img,
        },
      ]);
    }
    setIsUpdateMode(false);
    handleCancel();
  };

  const handleCancel = () => {
    form.resetFields();
    setDate("");
    setImg("");
    setIsModalOpen(false);
  };

  const handleShowConfirm = () => {
    setOpenModal(true);
  };

  const handleRemove = () => {
    const newData = data.filter(
      (item) => item.filename.toLocaleLowerCase() !== title.toLocaleLowerCase()
    );

    setData(newData);
    form.resetFields();
    setOpenModal(false);
  };

  const handleUpdate = (id: number, updateItems: any) => {
    setFilename(updateItems.filename);
    setCreator(updateItems.creator);
    setDate(updateItems.downloadDate);
    setImg(updateItems.image);
    setSelectedItemId(id);

    setData(
      data.map((item) => ({
        ...item,
        borderColor: item.id === id ? "border-blue-700" : "",
      }))
    );
    setIsUpdateMode(true);
    // Set initial values for the form fields
    form.setFieldsValue({
      filename: updateItems.filename,
      creator: updateItems.creator,
      date: updateItems.downloadDate,
      img: updateItems.image,
    });
  };

  const handleSearch = (searchTerm: string) => {
    if(searchTerm === ""){
      return data
    }else{
      const filteredData = data.filter(
        (item) =>
          item.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.creator.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setData(filteredData);
    }
  };
  const handleRemoveImg = () => {
    setImg("");
  };

  //drag and drop button
  const [buttonPosition, setButtonPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleDragStart = (e: React.DragEvent<HTMLButtonElement>) => {
    e.dataTransfer.setData("text/plain", "button");
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    if (data === "button") {
      const offsetX = e.clientX - buttonRef.current!.offsetWidth / 2;
      const offsetY = e.clientY - buttonRef.current!.offsetHeight / 2;
      setButtonPosition({ x: offsetX, y: offsetY });
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <div className=" flex flex-col gap-24 ">
        <NavBar onSearch={handleSearch} />
        {/* //cart */}
        <div className="mb-5">
          {data.map((item: any) => {
            return (
              <div
                className="w-[48%] mx-auto flex flex-col gap-3"
                key={item.id}
              >
                <h1 className="mt-5">{item.downloadDate}</h1>
                <div
                  className={`w-full flex justify-between border-2 rounded-xl shadow-md ${item.borderColor}`}
                >
                  <div
                    className="w-[15%] border-r-2 flex justify-center items-center"
                    onClick={() => handleUpdate(item.id, item)}
                  >
                    {item.image &&
                      typeof item.image === "string" && ( // Check if item.image exists and is a string
                        <img
                          src={item.image}
                          alt="Uploaded"
                          className="w-14 h-14"
                        />
                      )}
                  </div>
                  <div
                    className="w-[78%] py-3 px-4 "
                    onClick={() => handleUpdate(item.id, item)}
                  >
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
                      <MdClear size={23} onClick={handleShowConfirm} />
                    </div>
                    <Modal
                      open={openModal}
                      onCancel={() => setOpenModal(false)}
                      footer
                    >
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
            );
          })}
        </div>
        {/* //button floating */}
        <div
          className=" relative  bottom-10  left-0 min-h-96"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <button
            ref={buttonRef}
            draggable
            onDragStart={handleDragStart}
            className="bg-blue-600 w-12 absolute py-2 rounded-xl flex justify-center items-center"
            style={{
              left: buttonPosition.x,
              top: buttonPosition.y,
            }}
            onClick={showModal}
          >
            {isUpdateMode ? (
              <GrUpdate size={30} className="text-white" />
            ) : (
              <IoIosAddCircleOutline size={30} className="text-white" />
            )}
          </button>
        </div>
        {/* //Modal */}
        <Modal
          footer
          title={
            isUpdateMode ? "Update    Card Download" : "Create Card Download"
          }
          open={isModalOpen}
          centered
          onCancel={handleCancel}
          className=" text-center"
        >
          <Form
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            className=" mt-5"
            onFinish={handleSubmit}
            form={form}
          >
            <Form.Item<ItemDownload>
              label="Filename"
              name="filename"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                type="text"
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
              />
            </Form.Item>

            <Form.Item<ItemDownload>
              label="Creator"
              name="creator"
              rules={[
                {
                  required: true,
                  message: "Please input create and than 2 charactors!",
                },
              ]}
            >
              <Input
                type="text"
                value={creator}
                onChange={(e) => setCreator(e.target.value)}
              />
            </Form.Item>
            <Form.Item label="DatePicker">
              {/* <DatePicker className=" w-[100%]" name="data"/> */}
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Item>

            <Form.Item label="Image" name="image">
              <Input type="file" onChange={handleImageChange} />
              <div className=" relative">
                <img src={img} alt="Uploaded" className="w-18 h-16 mt-2" />
                <div className=" absolute top-0 left-20">
                  {" "}
                  <MdClear
                    size={20}
                    onClick={handleRemoveImg}
                    className=" hover:bg-slate-300 rounded-full"
                  />
                </div>
              </div>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 16, span: 8 }}>
              <Space>
                <Button type="primary" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                  {isUpdateMode ? "Save" : "Submit"}
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default CrudChrome;
