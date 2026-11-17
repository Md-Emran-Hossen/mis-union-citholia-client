import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Link, useNavigate } from "react-router";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const RegisterPage = () => {
  const { registerWithEmail } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [photo, setPhotoUrl] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState(null); // To store error message if registration fails

  const handleEmailRegister = async (e) => {
    e.preventDefault();
    setError(null); // Reset any previous errors

    try {
      await registerWithEmail(email, password, name, phone, photo, address);
      navigate("/login"); // Redirect on successful registration
    } catch (err) {
      setError(err.message); // Capture and display error message
      console.error(err.message);
    }
  };

  return (
    <div>
      <div className="hero min-h-screen bg-white font-semibold">
      <div className="card w-full max-w-xl  ">
        <form className="card-body" onSubmit={handleEmailRegister}>
          <h1 className="text-4xl font-extrabold text-center mb-4">
            প্রথমে রেজিস্ট্রেশন করুন!
          </h1>

          {/* Display error message */}
          {error && <p className="text-red-500 text-center">{error}</p>}

          <div className="form-control">
            <label className="label">
              <span className="label-text">নাম</span>
            </label>
            <input
              type="text"
              placeholder="নাম লিখুন"
              className="input input-bordered w-full pr-10"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">ই-মেইল</span>
            </label>
            <input
              type="email"
              placeholder="ভ্যালিড ই-মেইল লিখুন"
              className="input input-bordered w-full pr-10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">পাসওয়ার্ড</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="পাসওয়ার্ড লিখুন"
                className="input input-bordered w-full pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="absolute right-3 top-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </span>
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">মোবাইল</span>
            </label>
            <input
              type="tel"
              placeholder="মোবাইল নাম্বার লিখুন"
              className="input input-bordered w-full pr-10"
              value={phone}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">ফটো লিংক</span>
            </label>
            <input
              type="text"
              placeholder="ফটো লিংক লিখুন"
              className="input input-bordered w-full pr-10"
              value={photo}
              onChange={(e) => setPhotoUrl(e.target.value)}
              required
            />
            <div className="pt-3 text-xs">
              ডিফল্ট হিসেবে কপি এবং পেস্ট করুন:{" "}
              <span className="underline">
                https://ibb.co.com/Rpf7X7rL{" "}
              </span>
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">ঠিকানা</span>
            </label>
            <input
              type="text"
              placeholder="ঠিকানা লিখুন"
              className="input input-bordered w-full pr-10"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="form-control mt-6">
            <button className="btn btn-accent w-full">রেজিস্ট্রার</button>
          </div>

          <p className="mt-4 text-center">
            যদি একাউন্ট থাকে?{" "}
            <Link to="/login" className="link">
              লগইন করুন
            </Link>
          </p>
        </form>
      </div>
    </div>
    </div>
  );
};

export default RegisterPage;
