import React, { ChangeEvent, useState } from "react";
import NavBar from "./NavBar";
import Cart from "./Cart";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Button, Modal, Form, Input, Space } from "antd";



type ItemDownload = {
  id: number;
  downloadDate: String;
  filename: String;
  creator: String;
  image: String| null;
};  

const LayoutPage: React.FC = () => {
  const [data, setData] = useState<ItemDownload[]>([]);
  const [date, setDate] = useState<string>(""); 
  const [filename, setFilename] = useState<string>("")
  const [creator, setCreator] = useState<string>("")
  const [img, setImg] = useState<string | null>(null)
  const [filteredItems, setFilteredItems] = useState<ItemDownload[]>([]);
  const [form] = Form.useForm();

  const handleImageChange = (e:ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImg(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit =async () => {
    if(creator.length< 3){
      alert("Creator must be at least 3 characters long");
      return;
    }

    if (img) {
      const isValidSize = await isImageSizeValid(img);
      if (!isValidSize) {
        alert("Image size exceeds 2MB limit");
        return;
      }
    }
    const newItem: ItemDownload = {
      id: data.length + 1,
      downloadDate: date,
      filename: filename,
      creator: creator,
      image: img,
    };
    
    setData([...data, newItem]);
    handleCancel();
  }

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setDate("");
    setIsModalOpen(false);
  };

  const isImageSizeValid = async (image: string) => {
    const response = await fetch(image);
    const blob = await response.blob();
    const imageSizeInMB = blob.size / (1024 * 1024); // Calculate image size in MB
    return imageSizeInMB < 2; // Check if image size is less than 2MB
  };
  const onDelete = (title:string) => {
    const newData = data.filter((item) => item.filename.toLocaleLowerCase() !== title);
    setData(newData);
  };

  const onUpdate = (id:number, updateItems:Partial<ItemDownload>) => {
    const modifyItem = data.map((item) =>{
      if(item.id === id) {return {...item, ...updateItems}}
      return item;
    });
    setData(modifyItem);
  };
  
  const handleSearch = (searchTerm: string) => {
    const filtered = data.filter((item) =>
      item.filename.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  return (
    <div className="  flex flex-col gap-24">
      <NavBar onSearch={handleSearch} />
      <Cart data={data} onDelete={onDelete} onUpdate={onUpdate}/>
      <button
        onClick={showModal}
        className=" bg-blue-600 w-12 py-2 rounded-xl flex justify-center items-center fixed bottom-5 right-5 hover:bg-blue-500 transition-all duration-150"
      >
        <IoIosAddCircleOutline size={30} className=" text-white" />
      </button>
      
      <Modal
        footer
        title="Create Card Download"
        open={isModalOpen}
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
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input type="text" value={filename} onChange={(e) => setFilename(e.target.value)} />
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
            <Input type="text" value={creator} onChange={(e) => setCreator(e.target.value)} />
          </Form.Item>
          <Form.Item label="DatePicker">
            {/* <DatePicker className=" w-[100%]" name="data"/> */}
            <Input type="date" value={date} onChange={(e)=> setDate(e.target.value)}/>
          </Form.Item>

          <Form.Item
            label="Image"
            name="image"
            rules={[{ required: true, message: "Please select image" }]}
          >
            <Input type="file"  onChange={handleImageChange}/>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 16, span: 8 }}>
            <Space>
              <Button type="primary" onClick={handleCancel}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LayoutPage;
