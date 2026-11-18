import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, Link, useLoaderData } from 'react-router';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import {toBN} from 'react-en-bn';
import { useRevalidator } from "react-router";
import { MdDelete } from 'react-icons/md';


const AddBeneficiaries = () => {


  const revalidator = useRevalidator();
  const loadedBeneficiaries = useLoaderData();
  const [beneficiaries, setBeneficiaries] = useState(loadedBeneficiaries || []);

  const [benefits, setBenefits] = useState([]);
  const [benefitsId, setBenefitsId] = useState("");
  const [excelFile, setExcelFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

   // IMPORTANT: Update local state whenever loader data changes
      useEffect(() => {
          setBeneficiaries(loadedBeneficiaries || []);
      }, [loadedBeneficiaries]);

  // Load Benefit Data from MongoDB
  useEffect(() => {
    axios
      .get("http://localhost:5000/benefits")
      .then((res) => {
        setBenefits(res.data);
      })
      .catch((error) => {
        console.error("Benefit Loading Error:", error);
      });
  }, []);

  // Excel Upload Function
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!benefitsId) {
      return setMessage("Please select a Benefit");
    }

    if (!excelFile) {
      return setMessage("Please select an Excel file");
    }

    const formData = new FormData();

    formData.append("benefitsId", benefitsId);
    formData.append("excelFile", excelFile);

    try {
      setLoading(true);
      setMessage("");

      const response = await axios.post(
        "http://localhost:5000/upload-excel",
        formData
      );

      setMessage(
        `${response.data.message}. Total Rows: ${response.data.insertedCount}`
      );
      
      setExcelFile(null);
      setBenefitsId("");
      e.target.reset();
      revalidator.revalidate();

    } catch (error) {
      setMessage(
        error.response?.data?.message || "Upload Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-xl mx-auto p-6">

        <h1 className="text-2xl font-bold mb-5">
          Excel Upload System
        </h1>

        <form onSubmit={handleUpload}>

          {/* Dynamic Benefit Dropdown */}
          <label className="block mb-2 font-semibold">
            Select Benefit
          </label>

          <select
            className="select select-bordered w-full mb-5"
            value={benefitsId}
            onChange={(e) => setBenefitsId(e.target.value)}
          >
            <option value="">Select Benefit</option>

            {benefits.map((benefit) => (
              <option
                key={benefit._id}
                value={benefit._id}
              >
                {benefit.benefitsName}
              </option>
            ))}

          </select>

          {/* Excel File */}
          <label className="block mb-2 font-semibold">
            Select Excel File
          </label>

          <input
            type="file"
            accept=".xlsx,.xls"
            className="file-input file-input-bordered w-full mb-5"
            onChange={(e) =>
              setExcelFile(e.target.files[0] || null)
            }
          />

          {/* Upload Button */}
          <button
            type="submit"
            disabled={loading || benefits.length === 0}
            className="btn btn-primary w-full"
          >
            {loading ? "Uploading..." : "Upload Excel"}
          </button>

        </form>

        {message && (
          <p className="mt-4 font-semibold">
            {message}
          </p>
        )}

      </div>


      <div>
        <div className="mt-14 mx-2 my-5">
          <div className="flex justify-center justify-items-center">
            <h1 className="text-3xl font-bold text-center mb-10">
              মোট উপকারভোগী: {toBN(beneficiaries.length)}
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
                  <th>উপকারভোগীর নাম</th>
                  <th>পিতা</th>
                  <th>মাতা</th>
                  <th>হোল্ডিং নং</th>
                  <th>গ্রাম</th>
                  <th>পরিচিতি নম্বর</th>
                  <th>মোবাইল</th>
                  <th>ভাতার নাম</th>
                </tr>
              </thead>
              <tbody>

                {beneficiaries.map((beneficiary, index) => (
                  <tr key={beneficiary._id}
                    className="hover:bg-gray-100 text-xl"
                  >
                    <td>{toBN(index + 1)}</td>
                    <td>{beneficiary.beneficiaryName}</td>
                    <td>{beneficiary.fatherName}</td>
                    <td>{beneficiary.motherName}</td>
                    <td>{beneficiary.holdingNo}</td>
                    <td>{beneficiary.Village}</td>
                    <td>{beneficiary.identificationNumber}</td>
                    <td>{beneficiary.MobileNo}</td>
                    <td>{beneficiary.benefitsName}</td>
                    <td>
                      <button onClick={() => handleDelete(benefit._id)}
                        // className="btn btn-outline btn-error m-1">
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

    </>

  );
};


export default AddBeneficiaries;



