import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { Link, useLoaderData } from 'react-router';
import { MdDelete } from 'react-icons/md';
import {toBN} from 'react-en-bn';
import { useRevalidator } from "react-router";

const AddBenefits = () => {
    const revalidator = useRevalidator();
    const loadedBenefits = useLoaderData();
    const [benefits, setBenefits] = useState(loadedBenefits || []);

    const [formData, setFormData] = useState({
        benefitsName: '',
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // IMPORTANT: Update local state whenever loader data changes
    useEffect(() => {
        setBenefits(loadedBenefits || []);
    }, [loadedBenefits]);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.benefitsName) {
            newErrors.benefitsName = "Benefits Name is Required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        const benefits = {
            benefitsName: formData.benefitsName,
        };

        // Save Services information to the database
        const result = await fetch('http://localhost:5000/benefits', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(benefits)
        })

        const data = await result.json();
        // console.log("FOUND", data);
       
        if (data.insertedId) {
            toast.success(`${formData.benefitsName} is added successfully`);
            
            setFormData({ projectsName: "" });
            setErrors({});
            
            revalidator.revalidate();

            // navigate('/dashboard/loadBenefits');
        } else {
            toast.error('Failed to add benefits information.');
        }
};

// DELETE PROJECT
  const handleDelete = async (_id) => {

    // Confirmation message
    const confirmDelete = window.confirm(
         "আপনি কি নিশ্চিত যে এই তথ্য টি মুছে ফেলতে চান?"
    );

    if (!confirmDelete) {
        return;
    }

    try {
      const result = await fetch(
        `http://localhost:5000/benefit/${_id}`,
        {
          method: "DELETE",
        }
      );

      if (!result.ok) {
        throw new Error("Delete failed");
      }

      const data = await result.json();

      if (data.deletedCount > 0) {
        toast.success("Benefits data deleted successfully");

        // Reload loader data
        revalidator.revalidate();
      } else {
        toast.error("Data not found");
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to delete data");
    }
  };

return (
   <>
     <div className="p-4">
        <h2 className="text-xl md:text-center font-bold mt-5 p-2 underline">উপকারের ধরন যুক্ত করুন</h2>
        <div className="mx-auto mt-5 p-2">
            <form onSubmit={handleSubmit} className="w-full">

                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                            উপকারের ধরন:
                        </label>
                    </div>
                    <div className="md:w-1/3">
                        <input
                            type="text"
                            name="benefitsName"
                            value={formData.benefitsName}
                            onChange={handleInputChange}
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-none w-full py-2 px-4 text-gray-700 
          leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        />
                    </div>
                    {errors.benefitsName && <p className='text-red-500 text-xs'>{errors.benefitsName}</p>}
                </div>

                <div className="md:flex md:items-center">
                    <div className="md:w-1/3"></div>
                    <div className="md:w-2/3">

                        <input
                            className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white 
                       font-bold py-2 px-4 mb-10 rounded"
                            value="Submit"
                            type="submit"
                        />
                    </div>
                </div>
            </form>
        </div>
    </div>

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
                                                className="btn btn-outline btn-error m-1">
                                                {/* className="btn btn-outline btn-error m-1" disabled={true}> */}
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
   </>
);
};

export default AddBenefits;