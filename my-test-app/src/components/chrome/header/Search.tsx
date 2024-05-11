import { Input } from 'antd'
import { IoSearch } from 'react-icons/io5'
import { useChrome } from '../../../contexts/ChromeContext'

function Search() {
  const {handleSearch} = useChrome()
 
  return (
    <Input type='text' prefix={<IoSearch/>} onChange={(e)=> handleSearch(e.target.value)} placeholder="Search downloads" allowClear className=' rounded-full bg-slate-200 hover:border-blue-600 hover:bg-white'/>
  )
}

export default Search