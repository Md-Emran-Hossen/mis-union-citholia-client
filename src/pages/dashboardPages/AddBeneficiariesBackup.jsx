import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import axios from 'axios';


const AddBeneficiaries = () => {
   const [benefits, setBenefits] = useState([]);
    const [benefitObject, setBenefitObject] = useState({});
    const [formData, setFormData] = useState({
        benefitID: '',
        benefitsName: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBenefits = async () => {
            try {
                const res = await fetch('http://localhost:5000/benefits');

                const data = await res.json();
            //    console.log("District Information:= ", data);
                setBenefits(data);

                const tempBenefitObject = {};
                data.forEach(benefit => {
                    tempBenefitObject[benefit.benefitsName] = benefit._id;
                });
                // console.log("INNER VALUE:=",tempDistrictObject);
                setBenefitObject(tempBenefitObject);
            } catch (error) {
                console.error('Error fetching district:', error);
            }
        };

        fetchBenefits();
    }, []);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.benefitsName) {
            newErrors.benefitsName = "Benefit name is Required";
        }
     
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {

        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     if (!validateForm()) {
    //         return;
    //     }

//  const upazila = {
//             benefitID: benefitObject[formData.benefitsName],
//             benefitsName: formData.benefitsName
//         };
//         // console.log("District, Upazila, District ID:", upazila.districtName,upazila.upazilaName,upazila.districtID);
//         // Save Services information to the database
//         const result = await fetch('https://polling-station-management-server.vercel.app/upazilas', {
//             method: 'POST',
//             headers: {
//                 'content-type': 'application/json',
//             },
//             body: JSON.stringify(upazila)
//         })

//         const data = await result.json();
       
//         if (data.insertedId) {
//             // console.log("Data object found:", data.insertedId);
//             toast.success(`${formData.upazilaName} is added successfully`);
//             navigate('/dashboard/loadUpazilas');
//         } else {
//             toast.error('Failed to add Upazila information.');
//         }
//     };

    return (
         <div className="mx-5 px-5 ">
             <Helmet>
                <title> MIS | চিথলিয়া </title>
            </Helmet>
 
                <h2 className="text-3xl md:text-left font-bold pl-10">উপকারভোগী করুন</h2>
                <form  className="border shadow-lg py-2 px-6 mt-3 flex flex-col md:flex-row">
                <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-5">
                              
                        <div className="form-control w-full max-w-xs border p-2 border-indigo-400 mb-3">
                            <div className='flex justify-center items-center max-w-xs'>
                                <label className="label"> <span className="label-text">সেবার নাম বাছাই করুন:</span></label>
                                <select
                                 //   id = {formData._id}
                                    name="benefitsName"
                                    value={formData.benefitsName}
                                    onChange={handleInputChange}
                                    className="input input-bordered w-full max-w-xs rounded-none text-sm bg-white"
                                >
                                    <option value="">জেলা বাছাই করুন</option>
                                    {Object.keys(benefitObject).map((benefit, index) => (
                                        <option key={index} value={benefit}>
                                            {benefit}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {errors.benefitsName && <p className='text-red-500 text-xs'>{errors.benefitsName}</p>}
                        </div>

                         {/* <div className="border p-2 border-indigo-400 mb-3">
                            <div className="flex input-bordered rounded-none">
                                <label className="label"> <span className="label-text">উপজেলা:</span></label>
                                <input
                                    type="text"
                                    name="upazilaName"
                                    value={formData.upazilaName}
                                    onChange={handleInputChange}
                                    className="input input-bordered w-full rounded-none bg-white"
                                />
                            </div>
                            {errors.upazilaName && <p className='text-red-500 text-xs'>{errors.upazilaName}</p>}
                        </div> */}

                        <div className="mx-5 px-5">
                             <input className='btn btn-info md:w-80 w-64 rounded-none mt-1' value="সংরক্ষণ করুন" type="submit" />
                        </div>
                    </div>
                </form>
                  <br />
                        <br />
                         <br />
                        <br />
                         <br />
                        <br />
        </div>
    );
};

export default AddBeneficiaries;



