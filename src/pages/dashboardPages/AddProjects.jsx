import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { Link, useLoaderData } from 'react-router';
import { MdDelete } from 'react-icons/md';
import {toBN} from 'react-en-bn';
import { useRevalidator } from "react-router";

const AddProjects = () => {

   const revalidator = useRevalidator();
   const loadedProjects = useLoaderData();
//    console.log("Projects Info", loadedProjects);
   const [projects, setProjects] = useState(loadedProjects || []);

   const [formData, setFormData] = useState({
        projectsName: '',
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

     // IMPORTANT: Update local state whenever loader data changes
    useEffect(() => {
        setProjects(loadedProjects || []);
    }, [loadedProjects]);


    const validateForm = () => {
        const newErrors = {};
        if (!formData.projectsName) {
            newErrors.projectsName = "Projects Name is Required";
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

        const projects = {
            projectsName: formData.projectsName,
        };

        // Save Services information to the database
        const result = await fetch('http://localhost:5000/projects', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(projects)
        })

        const data = await result.json();
        // console.log("FOUND", data);
       
        if (data.insertedId) {
           
            // console.log("Data object found:", data.insertedId);
            toast.success(`${formData.projectsName} is added successfully`);
            // navigate('/dashboard/addProjects');
            setFormData({ projectsName: "" });
            setErrors({});
            
            revalidator.revalidate();
        } else {
            toast.error('Failed to add projects information.');
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
        `http://localhost:5000/project/${_id}`,
        {
          method: "DELETE",
        }
      );

      if (!result.ok) {
        throw new Error("Delete failed");
      }

      const data = await result.json();

      if (data.deletedCount > 0) {
        toast.success("Projects data deleted successfully");

        // Reload loader data
        revalidator.revalidate();
      } else {
        toast.error("Project not found");
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to delete project");
    }
  };

//   const handleDelete = (_id) => {
//         fetch(`http://localhost:5000/project/${_id}`, {
//             method: "DELETE",
//         })
//             .then((res) => res.json())
//             .then((data) => {
//                 if (data.deletedCount) {
//                     toast.success("Projects data deleted Successfully", {
//                         position: "top-right",
//                     });
//                     const remainingData = projects.filter((project) => project._id !== _id);
//                     setProjects(remainingData);
//                 }
//             });
//     };

return (
    <>
    <div className="p-4">
        <h2 className="text-xl md:text-center font-bold mt-5 p-2 underline">প্রকল্পের নাম যুক্ত করুন</h2>
        <div className="mx-auto mt-5 p-2">
            <form onSubmit={handleSubmit} className="w-full">

                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                            প্রকল্পের নাম:
                        </label>
                    </div>
                    <div className="md:w-1/3">
                        <input
                            type="text"
                            name="projectsName"
                            value={formData.projectsName}
                            onChange={handleInputChange}
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-none w-full py-2 px-4 text-gray-700 
          leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                        />
                    </div>
                    {errors.projectsName && <p className='text-red-500 text-xs'>{errors.projectsName}</p>}
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
                        মোট উপকারের ধরন: {toBN(projects.length)}
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
                                <th>প্রকল্পের নাম</th>
                                <th>কার্যক্রম</th>
                            </tr>
                        </thead>
                        <tbody>

                            {projects.map((project, index) => (
                                <tr key={project._id}
                                    className="hover:bg-gray-100 text-xl"
                                >   
                                    <td>{toBN(index + 1)}</td>       
                                    <td>{project.projectsName}</td>
                                    <td>
                                        <button onClick={() => handleDelete(project._id)}
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
    </ >
);
};

export default AddProjects;