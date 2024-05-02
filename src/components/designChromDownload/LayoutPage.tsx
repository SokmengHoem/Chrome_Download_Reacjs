import React, { useState } from 'react'
import NavBar from './NavBar'
import Cart from './Cart'
import itemsList from '../../db/data';

type ItemDownload = {
  id: number;
  downloadDate: String;
  title: String;
  url_ref: String;
  show_download: String;
  image: String;
};

const LayoutPage: React.FC = () => {
  const [data, setData] = useState<ItemDownload[]>(itemsList);
  const [filteredItems, setFilteredItems] = useState<ItemDownload[]>([]);

  const handleSearch = (searchTerm: string) => {
    const filtered = data.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  };
  return (
    <div className=' flex flex-col gap-24'>
        <NavBar onSearch={handleSearch}/>
        <Cart data={ data.length > 0 ? filteredItems : data}/>
    </div>
  )
}

export default LayoutPage;
