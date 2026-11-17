import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Link, useNavigate } from "react-router";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const LoginPage = () => {
  const { loginWithEmail } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null); // State to handle error messages

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError(null); // Reset any previous errors

    try {
      await loginWithEmail(email, password); // Try to log in
      navigate("/dashboard"); // If successful, navigate to dashboard
    } catch (err) {
      setError(err.message); // Set error message if login fails
      console.error(err.message);
    }
  };
  //  const handleGoogleLogin = () => {
  //   // console.log("helloo");
  //   loginWithGoogle()
  //     .then((res) => {
  //       console.log(res);
  //       navigate("/");
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  return (
    <div className="hero min-h-screen bg-white font-semibold">
      <div className="card w-full max-w-xl ">
        <form className="card-body" onSubmit={handleEmailLogin}>
          <h1 className="text-4xl font-extrabold text-center mb-4">
            লগইন করুন!
          </h1>

          {/* Display error message */}
          {error && <p className="text-red-500 text-center">{error}</p>}

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
            <label className="label">
              <Link to="#" className="label-text-alt link link-hover">
                পাসওয়ার্ড ভুলে গেছেন?
              </Link>
            </label>
          </div>

          <div className="form-control mt-6">
            <button className="btn bg-black text-white w-full">লগইন</button>
          </div>

          <p className="mt-4 text-center">
            যদি একাউন্ট না থাকে?{" "}
            <Link to="/register" className="link">
              রেজিস্টার করুন
            </Link>
          </p>
        </form>
        {/* <div className="card-body">
              <button onClick={handleGoogleLogin} className="btn btn-secondary">
                Login with Google
              </button>
        </div> */}
      </div>
    </div>
  );
};

export default LoginPage;
