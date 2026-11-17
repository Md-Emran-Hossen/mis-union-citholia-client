import React from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useLoaderData } from 'react-router';
import { MdDelete } from 'react-icons/md';
import {toBN} from 'react-en-bn';

const LoadBenefits = () => {
    const loadedBenefits = useLoaderData();
    // console.log("Benefits Info", loadedBenefits);
    const [benefits, setBenefits] = useState(loadedBenefits);

    const handleDelete = (_id) => {
        fetch(`http://localhost:5000/benefit/${_id}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.deletedCount) {
                    toast.success("Benefits data deleted Successfully", {
                        position: "top-right",
                    });
                    const remainingData = benefits.filter((benefit) => benefit._id !== _id);
                    setBenefits(remainingData);
                }
            });
    };

    return (
        <div>
            <div className="mt-14 mx-2 my-5">
                <div className="flex justify-center justify-items-center">
                    <h1 className="text-3xl font-bold text-center mb-10">
                        মোট উপকারের ধরন: {toBN(benefits.length)}
                    </h1>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to="/dashboard">
                        <button
                            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white 
py-2 px-4 border border-blue-500 hover:border-transparent rounded-tl-md rounded-br-md"
                        >
                            ড্যাশবোর্ড
                        </button>
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="table table-xs">
                        <thead>
                            <tr className="bg-green-50 font-bold text-xl">
                                <th>ক্রম</th>
                                <th>উপকারের ধরন</th>
                                <th>কার্যক্রম</th>
                            </tr>
                        </thead>
                        <tbody>

                            {benefits.map((benefit, index) => (
                                <tr key={benefit._id}
                                    className="hover:bg-gray-100 text-xl"
                                >   
                                    <td>{toBN(index + 1)}</td>       
                                    <td>{benefit.benefitsName}</td>
                                    <td>
                                        <button onClick={() => handleDelete(benefit._id)}
                                            className="btn btn-outline btn-error m-1" disabled={true}>
                                            <MdDelete />Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default LoadBenefits;