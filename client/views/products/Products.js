import React, { useState, useEffect } from 'react'
import apiProducts from './apiProducts'
import PageHeader from '../../components/PageHeader'
import AddEditProducts from './AddEditProducts'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'


export default function Product() {

    const [products, setProducts] = useState([]);
    const [modal, setModal] = useState(false);
    const [status, setStatus] = useState(false);

    const [product, setProduct] = useState({
        prod_id: undefined,
        actionType: undefined
    })

    useEffect(() => {
        apiProducts.list().then(data => {
            setProducts(data)
        }).catch(err => {
            console.log(err)
        });

    }, []);

    useEffect(() => {
        apiProducts.list().then(data => {
            setProducts(data)
        }).catch(err => {
            console.log(err)
        });

        setStatus(false)

    }, [status]);

    const onCreate = async (id) => {
        setProduct({
            prod_id: id,
            actionType: 'Add'
        });
        setModal(true);
    }

    const onEdit = async (id) => {
        setProduct({
            prod_id: id,
            actionType: 'Edit'
        });
        setModal(true);
    }

    const onDelete = async (id) => {
        apiProducts.remove(id).then(() => {
            setStatus(true)
        });
    }


    return (
        <div>
            <PageHeader title={'Detail Products'} setModal={() => onCreate()} />
            <div className="flex flex-col max-w-full">
                <div className="my-2 overflow-auto sm:-mx-6 lg:-mx-8 ">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden sm:rounded-lg">

                            <table className="max-w-2xl divide-gray-200">
                                <thead className="bg-red-500">
                                    <tr>

                                        <th
                                            scope="col"
                                            className="pl-12 px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider"
                                        >
                                            Id
                                        </th>
                                        <th
                                            scope="col"
                                            className="pl-12 px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider"
                                        >
                                            Products
                                        </th>
                                        <th
                                            scope="col"
                                            className="pl-10 px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider"
                                        >
                                            Description
                                        </th>

                                        <th
                                            scope="col"
                                            className="pl-12 px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider"
                                        >
                                            Price
                                        </th>

                                        <th
                                            scope="col"
                                            className="pl-12 px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider"
                                        >
                                            Stock
                                        </th>

                                        <th
                                            scope="col"
                                            className="pl-10 px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider"
                                        >
                                            Expire
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider"
                                        >
                                            Weight
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider"
                                        >
                                            Category
                                        </th>

                                        <th
                                            scope="col"
                                            className="pl-12 px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider"
                                        >
                                            Brand
                                        </th>

                                        <th
                                            scope="col"
                                            className="pl-12 px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider"
                                        >
                                            Condition
                                        </th>

                                        <th
                                            scope="col"
                                            className="pl-12 px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider"
                                        >
                                            Total Sold
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider"
                                        >
                                            Rating
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider"
                                        >
                                            Views
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider"
                                        >
                                            User ID
                                        </th>

                                        <th
                                            className="px-6 py-3 col-span-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider"
                                        >
                                            Action
                                        </th>

                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {products &&
                                        products.map((data) => (
                                            <tr key={data.prod_id}>


                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.prod_id}</div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.prod_name}</div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.prod_desc}</div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.prod_price}</div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.prod_stock}</div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.prod_expire}</div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.prod_weight}</div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.prod_category}</div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.prod_brand}</div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.prod_condition}</div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.prod_total_sold}</div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.prod_rating}</div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.prod_views}</div>
                                                </td>

                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.prod_user_id}</div>
                                                </td>



                                                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                                                    <div className="mt-5 flex lg:mt-0 lg:ml-4">
                                                        <span className="hidden sm:block mr-2">
                                                            <button
                                                                onClick={() => {
                                                                    onEdit(data.prod_id)
                                                                }}
                                                                type="button"
                                                                className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                                                            >
                                                                <PencilAltIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
                                                            </button>
                                                        </span>
                                                        <span className="hidden sm:block">
                                                            <button
                                                                onClick={() => {
                                                                    if (window.confirm('Delete this record ?'))
                                                                        onDelete(data.prod_id)
                                                                }}
                                                                type="button"
                                                                className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110"
                                                            >
                                                                <TrashIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
                                                            </button>
                                                        </span>
                                                    </div>
                                                </td></tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {modal ? <AddEditProducts
                title={'Product'}
                setModal={() => setModal(false)}
                setStatus={() => setStatus(true)}
                product={product}
            /> : null}

        </div>
    )
}
