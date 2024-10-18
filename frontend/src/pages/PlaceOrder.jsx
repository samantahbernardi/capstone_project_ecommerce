import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/assets'
import { ShopContext } from '../context/ShopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const PlaceOrder = () => {

    const [method, setMethod] = useState('cod');
    const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
    const [formData, setFormData] = useState({
        nome: '',
        cognome: '',
        email: '',
        indirizzo: '',
        città: '',
        provincia: '',
        CAP: '',
        nazione: '',
        telefono: ''
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setFormData(data => ({ ...data, [name]: value }))
    }

    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name:'Order Payment',
            description:'Order Payment',
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
                console.log(response)
                try {
                    
                    const { data } = await axios.post(backendUrl + '/api/order/verifyRazorpay',response,{headers:{token}})
                    if (data.success) {
                        navigate('/orders')
                        setCartItems({})
                    }
                } catch (error) {
                    console.log(error)
                    toast.error(error)
                }
            }
        }
        // const rzp = new window.Razorpay(options)
        // rzp.open()
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        try {

            let orderItems = []

            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        const itemInfo = structuredClone(products.find(product => product._id === items))
                        if (itemInfo) {
                            itemInfo.quantity = cartItems[items][item]
                            orderItems.push(itemInfo)
                        }
                    }
                }
            }

            let orderData = {
                address: formData,
                items: orderItems,
                amount: getCartAmount() + delivery_fee
            }
            

            switch (method) {

                // API Calls for COD
                case 'pagamento-alla-consegna':
                    const response = await axios.post(backendUrl + '/api/order/place',orderData,{headers:{token}})
                    if (response.data.success) {
                        setCartItems({})
                        navigate('/orders')
                    } else {
                        toast.error(response.data.message)
                    }
                    break;

                case 'stripe':
                    const responseStripe = await axios.post(backendUrl + '/api/order/stripe',orderData,{headers:{token}})
                    if (responseStripe.data.success) {
                        const {session_url} = responseStripe.data
                        window.location.replace(session_url)
                    } else {
                        toast.error(responseStripe.data.message)
                    }
                    break;

                default:
                    break;
            }


        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }


    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
            {/* ------------- Left Side ---------------- */}
            <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

                <div className='text-xl sm:text-2xl my-3'>
                    <Title text={'check-out sicuro'} />
                </div>
                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name='nome' value={formData.nome} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Nome' />
                    <input required onChange={onChangeHandler} name='cognome' value={formData.cognome} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Cognome' />
                </div>
                <input required onChange={onChangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Indirizzo e-mail' />
                <input required onChange={onChangeHandler} name='indirizzo' value={formData.indirizzo} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Indirizzo' />
                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name='città' value={formData.città} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Città' />
                    <input onChange={onChangeHandler} name='provincia' value={formData.provincia} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Provincia' />
                </div>
                <div className='flex gap-3'>
                    <input required onChange={onChangeHandler} name='CAP' value={formData.CAP} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='CAP' />
                    <input required onChange={onChangeHandler} name='nazione' value={formData.nazione} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Paese' />
                </div>
                <input required onChange={onChangeHandler} name='telefono' value={formData.telefono} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='N. di telefono' />
            </div>

            {/* ------------- Right Side ------------------ */}
            <div className='mt-8'>

                <div className='mt-8 min-w-80'>
                    <CartTotal />
                </div>

                <div className='mt-12'>
                    <Title text={'Scegli il tuo metodo di pagamento'}  />
                    {/* --------------- Payment Method Selection ------------- */}
                    <div className='flex gap-3 flex-col lg:flex-row'>
                        <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
                            <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
                        </div>
                        <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'paypal' ? 'bg-green-400' : ''}`}></p>
                            <p className='text-gray-500 text-sm font-medium mx-4'>Paypal</p>
                        </div>
                        <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
                            <p className='text-gray-500 text-sm font-medium mx-4'>PAGAMENTO ALLA CONSEGNA</p>
                        </div>
                    </div>

                    <div className='w-full text-end mt-8'>
                        <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>Procedi all'ordine</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default PlaceOrder
