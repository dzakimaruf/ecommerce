import React, { Fragment, useRef, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { DocumentAddIcon } from '@heroicons/react/solid'
import apiProducts from './apiProducts'
import ecom from '../../assets/images/ezbuy.png'




export default function AddEditProducts(props) {
    const [open, setOpen] = useState(true)
    const cancelButtonRef = useRef();

    const [values, setValues] = useState({
        prod_id: '',
        prod_name: '',
        prod_desc: '',
        prod_price: '',
        prod_stock: '',
        prod_expire: '',
        prod_weight: '',
        prod_category: '',
        prod_brand: '',
        prod_condition: '',
        prod_total_sold: '',
        prod_rating: '',
        prod_views: '',
        prod_user_id: '',

    });

    useEffect(() => {
        if (props.product.actionType === 'Edit') {
            apiProducts.findOne(props.product.prod_id).then(data => {

                setValues({
                    ...values,
                    prod_id: data.prod_id,
                    prod_name: data.prod_name,
                    prod_desc: data.prod_description,
                    prod_price: data.prod_price,
                    prod_stock: data.prod_stock,
                    prod_expire: data.prod_expire,
                    prod_weight: data.prod_weight,
                    prod_category: data.prod_category,
                    prod_brand: data.prod_brand,
                    prod_condition: data.prod_condition,
                    prod_total_sold: data.prod_total_sold,
                    prod_rating: data.prod_rating,
                    prod_views: data.prod_views,
                    prod_user_id: data.prod_user_id,

                })

            });
        } else {
            setValues({
                ...values,
                prod_id: undefined,
                prod_name: "",
                prod_desc: "",
                prod_price: Number,
                prod_stock: Number,
                prod_expire: Date,
                prod_weight: Number,
                prod_category: Number,
                prod_brand: Number,
                prod_condition: "",
                prod_total_sold: Number,
                prod_rating: Number,
                prod_views: Number,
                prod_user_id: Number,
            })
        }

    }, [props.product.actionType])

    const handleOnChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
    }

    const onSubmit = () => {
        const product = {
            prod_id: undefined,
            prod_name: values.prod_name,
            prod_desc: values.prod_desc,
            prod_price: values.prod_price,
            prod_stock: values.prod_stock,
            prod_expire: values.prod_expire,
            prod_weight: values.prod_weight,
            prod_category: values.prod_category,
            prod_brand: values.prod_brand,
            prod_condition: values.prod_condition,
            prod_total_sold: values.prod_total_sold,
            prod_rating: values.prod_rating,
            prod_views: values.prod_views,
            prod_user_id: values.prod_user_id,


        }
        if (props.product.actionType === 'Add') {
            const product = {
                prod_id: values.prod_id || undefined,
                prod_name: values.prod_name || undefined,
                prod_desc: values.prod_desc || undefined,
                prod_price: values.prod_price || undefined,
                prod_stock: values.prod_stock || undefined,
                prod_expire: values.prod_expire || undefined,
                prod_weight: values.prod_weight || undefined,
                prod_category: values.prod_category || undefined,
                prod_brand: values.prod_brand || undefined,
                prod_condition: values.prod_condition || undefined,
                prod_total_sold: values.prod_total_sold || undefined,
                prod_rating: values.prod_rating || undefined,
                prod_views: values.prod_views || undefined,
                prod_user_id: values.prod_user_id || undefined,

            }
            apiProducts.create(product).then(result => {
                console.log(result);
            })


        } else if (props.product.actionType === 'Edit') {
            apiProducts.update(values).then((data) => {
                if (data.error) {
                    setValues({ ...values, error: data.error })
                } else {
                    setValues({ ...values, error: '', open: true });
                }
            });
        }
        props.setStatus();
        props.setModal();
    }

    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog
                as="div"
                static
                className="fixed z-10 inset-0 overflow-y-auto"
                initialFocus={cancelButtonRef}
                open={open}
                onClose={setOpen}
            >
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 sm:max-w-xl">
                                <div className="lg:flex sm:items-start">
                                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <img src={ecom} className="h-24 w-24 " aria-hidden="true" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                            {props.product.actionType} {props.title}
                                        </Dialog.Title>

                                        {/** code here... */}
                                        {/* <form method="POST" action="#">
                                                <input id="villa_id" name="villa_id"
                                                    value={values.villa_id}
                                                    onChange={handleOnChange('villa_id')}
                                                    type="text" placeholder="e.g Id" />

                                                <input id="villa_title" name="villa_title"
                                                    value={values.villa_title}
                                                    onChange={handleOnChange('villa_title')}
                                                    type="text" placeholder="Villa's Name" />

                                                <input id="villa_description" name="villa_description"
                                                    value={values.villa_description}
                                                    onChange={handleOnChange('villa_description')}
                                                    type="text" placeholder="Description" />

                                                <input id="villa_address" name="villa_address"
                                                    value={values.villa_address}
                                                    onChange={handleOnChange('villa_address')}
                                                    type="text" placeholder="Address" />

                                                <input id="villa_kamar_tidur" name="villa_kamar_tidur"
                                                    value={values.villa_kamar_tidur}
                                                    onChange={handleOnChange('villa_kamar_tidur')}
                                                    type="number" placeholder="Bedroom" />

                                                <input id="villa_kamar_mandi" name="villa_kamar_mandi"
                                                    value={values.villa_kamar_mandi}
                                                    onChange={handleOnChange('villa_kamar_mandi')}
                                                    type="number" placeholder="Bathroom" />

                                                <input id="villa_tipe" name="villa_tipe"
                                                    value={values.villa_tipe}
                                                    onChange={handleOnChange('villa_tipe')}
                                                    type="text" placeholder="Type" />

                                                <input id="villa_lantai" name="villa_lantai"
                                                    value={values.villa_lantai}
                                                    onChange={handleOnChange('villa_lantai')}
                                                    type="number" placeholder="Floor" />

                                                <input id="villa_fasilitas" name="villa_fasilitas"
                                                    value={values.villa_fasilitas}
                                                    onChange={handleOnChange('villa_fasilitas')}
                                                    type="text" placeholder="Facility" />

                                                <input id="villa_price" name="villa_price"
                                                    value={values.villa_price}
                                                    onChange={handleOnChange('villa_price')}
                                                    type="text" placeholder="Price" />

                                                <input id="villa_status" name="villa_status"
                                                    value={values.villa_status}
                                                    onChange={handleOnChange('villa_status')}
                                                    type="text" placeholder="Status" />

                                                <input id="villa_user_id" name="villa_user_id"
                                                    value={values.villa_user_id}
                                                    onChange={handleOnChange('villa_user_id')}
                                                    type="number" placeholder="UserID" />

                                            </form> */}
                                        {/* <section class="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 class="text-lg font-semibold text-gray-700 capitalize dark:text-white">Account settings</h2> */}
                                        <div class="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
                                            <div class="md:grid md:grid-cols-3 md:gap-6  items-center">
                                                <div class="mt-5 md:mt-0 md:col-span-5">
                                                    <form action="#" method="POST">
                                                        <div class="shadow overflow-hidden sm:rounded-md">
                                                            <div class="px-4 py-5 bg-white sm:p-6">
                                                                <div class="grid grid-cols-4 gap-12 ">
                                                                    <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                                                                        <input type="text" name="prod_id" id="prod_id"
                                                                            onChange={handleOnChange('prod_id')}
                                                                            value={values.prod_id} className="hidden" />

                                                                        <label for="prod_name" class="block text-sm font-medium text-gray-700">Products</label>
                                                                        <input type="text" name="prod_name" id="prod_name"
                                                                            onChange={handleOnChange('prod_name')}
                                                                            value={values.prod_name}
                                                                            autocomplete="given-name" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                                                    </div>

                                                                    <div class="col-span-6 sm:col-span-4">
                                                                        <label for="prod_desc" class="block text-sm font-medium text-gray-700">Deskripsi</label>
                                                                        <input type="text" name="prod_desc" id="prod_desc"
                                                                            value={values.prod_desc}
                                                                            onChange={handleOnChange('prod_desc')}
                                                                            autocomplete="family-name" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                                                    </div>

                                                                    <div class="col-span-6 sm:col-span-4">
                                                                        <label for="villa_description" class="block text-sm font-medium text-gray-700">Price</label>
                                                                        <input type="text" name="prod_price" id="prod_price"
                                                                            value={values.prod_price}
                                                                            onChange={handleOnChange('prod_price')}
                                                                            autocomplete="villa_description" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                                                    </div>
                                                                    <div class="col-span-6 sm:col-span-4">
                                                                        <label for="prod_stock" class="block text-sm font-medium text-gray-700">Stock</label>
                                                                        <input type="text" name="prod_stock"
                                                                            value={values.prod_stock}
                                                                            onChange={handleOnChange('prod_stock')}
                                                                            id="phoneNumber" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                                                    </div>

                                                                    <div class="col-span-6 sm:col-span-4">
                                                                        <label for="prod_expire" class="block text-sm font-medium text-gray-700">Expire</label>
                                                                        <input type="date" name="prod_expire"
                                                                            value={values.prod_expire}
                                                                            onChange={handleOnChange('prod_expire')}
                                                                            id="phoneNumber" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                                                    </div>

                                                                    <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                                                                        <label for="prod_weight" class="block text-sm font-medium text-gray-700">Weight(gram)</label>
                                                                        <input type="text" name="prod_weight"
                                                                            value={values.prod_weight}
                                                                            onChange={handleOnChange('prod_weight')}
                                                                            id="phoneNumber" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                                                    </div>

                                                                    <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                                                                        <label for="prod_category" class="block text-sm font-medium text-gray-700">Categories</label>
                                                                        <input type="text" name="prod_category"
                                                                            value={values.prod_category}
                                                                            onChange={handleOnChange('prod_category')}
                                                                            id="phoneNumber" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                                                    </div>

                                                                    <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                                                                        <label for="prod_brand" class="block text-sm font-medium text-gray-700">Brand</label>
                                                                        <input type="text" name="prod_brand"
                                                                            value={values.prod_brand}
                                                                            onChange={handleOnChange('prod_brand')}
                                                                            id="phoneNumber" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" />
                                                                    </div>

                                                                    <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                                                                        <label for="prod_condition" class="block text-sm font-medium text-gray-700">Condition</label>
                                                                        <select id="prod_condition" type="text" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                                            value={values.prod_condition}
                                                                            onChange={handleOnChange('prod_condition')}>
                                                                            <option value="1">New</option>
                                                                            <option value="2">Second</option>
                                                                        </select>
                                                                    </div>

                                                                    <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                                                                        <label for="prod_total_sold" class="block text-sm font-medium text-gray-700">Total Sold</label>
                                                                        <input id="prod_total_sold" type="text" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                                            value={values.prod_total_sold}
                                                                            onChange={handleOnChange('prod_total_sold')}
                                                                        >
                                                                        </input>
                                                                    </div>

                                                                    <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                                                                        <label for="prod_rating" class="block text-sm font-medium text-gray-700">Rating</label>
                                                                        <select id="prod_rating" type="text" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                                            value={values.prod_rating}
                                                                            onChange={handleOnChange('prod_rating')}>
                                                                            <option value="1">1</option>
                                                                            <option value="2">2</option>
                                                                            <option value="3">3</option>
                                                                            <option value="4">4</option>
                                                                            <option value="5">5</option>
                                                                        </select>
                                                                    </div>

                                                                    <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                                                                        <label for="prod_views" class="block text-sm font-medium text-gray-700">Views</label>
                                                                        <input id="prod_views" type="text" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                                            value={values.prod_views}
                                                                            onChange={handleOnChange('prod_views')}
                                                                        >
                                                                        </input>
                                                                    </div>

                                                                    <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                                                                        <label for="prod_user_id" class="block text-sm font-medium text-gray-700">User Id</label>
                                                                        <input id="prod_user_id" type="text" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                                            value={values.prod_user_id}
                                                                            onChange={handleOnChange('prod_user_id')}
                                                                        >
                                                                        </input>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={onSubmit}
                                >
                                    Submit
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => props.setModal()}
                                    ref={cancelButtonRef}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}
