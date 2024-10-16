import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import { assets } from '../assets/assets';

const Catalogue = () => {

  const { products , search , showSearch } = useContext(ShopContext);
  const [showFilter,setShowFilter] = useState(false);
  const [filterProducts,setFilterProducts] = useState([]);
  const [category,setCategory] = useState([]);

  const toggleCategory = (e) => {

    if (category.includes(e.target.value)) {
        setCategory(prev=> prev.filter(item => item !== e.target.value))
    }
    else{
      setCategory(prev => [...prev,e.target.value])
    }

  }


  const applyFilter = () => {

    let copyProducts = products.slice();

    if (showSearch && search) {
      copyProducts = copyProducts.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      copyProducts = copyProducts.filter(item => category.includes(item.category));
    }


    setFilterProducts(copyProducts)

  }


  useEffect(()=>{
      applyFilter();
  },[category,search,showSearch,products])


  return (
    <div className='flex flex-col sm:flex-row sm:gap-10 pt-10 border-t'>
      
        {/* Category Filter */}
        <div className={`border border-gray-300 pl-8 py-5 mt-6 ${showFilter ? '' :'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIA</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Viso'} onChange={toggleCategory}/> Viso
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Corpo'} onChange={toggleCategory}/> Corpo
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Capelli'} onChange={toggleCategory}/> Capelli
            </p>
          </div>
        </div>

        {/* Right side */}
      <div className='flex-1'>

       <div className='flex justify-between text-base sm:text-2xl mb-4'>
        <Title text={'TUTTI I PRODOTTI'} />
      </div>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProducts.map((item,index)=>(
              <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
            ))
          }
        </div>
   </div>

</div> 
  )
}

export default Catalogue
