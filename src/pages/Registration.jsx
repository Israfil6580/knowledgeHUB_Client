import axios from "axios";
import { Button } from "@material-tailwind/react";
import { Link, ScrollRestoration, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from "../Hooks/useAuth";
import { FidgetSpinner, RotatingLines } from "react-loader-spinner";
import { useState } from "react";
import toast from "react-hot-toast";
import useAxiosPublic from "../Hooks/useAxiosPublic";
const Registration = () => {
  const { createUser, updateUser, setUser, loading } = useAuth();
  const image_hosting_key = import.meta.env.VITE_image_hosting_key;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { googleSignIn, githubSignIn } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const googleSubmit = async () => {
    await googleSignIn();
    return navigate(location.state || "/", { replace: true });
  };
  const githubSubmit = async () => {
    await githubSignIn();
    return navigate(location.state || "/", { replace: true });
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    try {
      // Create user
      const result = await createUser(data.email, data.password);
      // Upload image
      const formData = new FormData();
      formData.append("image", data.image[0]);

      const response = await axios.post(image_hosting_api, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const imageUrl = response.data.data.url;

      // Update user profile
      await updateUser(data.name, imageUrl);
      // Set user state with the updated profile
      setUser({ ...result?.user, displayName: data.name, photoURL: imageUrl });
      // Update user info in the database
      const userInfo = {
        name: data.name,
        email: result.user.email,
        photoURL: imageUrl,
        role: data.role,
      };

      await axiosPublic.post("/users", userInfo);
      toast.success("Success! You've signed up and are ready to go!");
      return navigate(location.state || "/", { replace: true });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return loading ? (
    <div className="min-h-screen flex justify-center items-center">
      <RotatingLines
        visible={true}
        height="96"
        width="96"
        color="grey"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  ) : (
    <div className="min-h-screen flex justify-center items-center py-10">
      <div className="w-full max-w-md p-4 rounded-md shadow sm:p-8 bg-white">
        <h2 className="mb-1 text-3xl font-title font-extrabold text-center">
          Register new account
        </h2>
        <p className="text-sm mb-3 text-center">
          Already have an account?{" "}
          <Link
            to={"/Login"}
            rel="noopener noreferrer"
            className="underline hover:underline-offset-2"
          >
            Log in here
          </Link>
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="fullName" className="block text-[15px]">
                Full name
              </label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                placeholder="Full name"
                className="w-full px-3 py-2 border rounded-md text-gray-700 transition-transform border-gray-400 outline-none"
                {...register("name", { required: "Name is required" })}
              />
              {errors.fullName && <p role="alert">{errors.fullName.message}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-[15px]">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="leroy@jenkins.com"
                className="w-full px-3 py-2 border rounded-md text-gray-700 transition-transform border-gray-400 outline-none"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Please enter a valid email address",
                  },
                })}
              />
              {errors.email && <p role="alert">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <label htmlFor="password" className="text-[15px]">
                  Password
                </label>
                <button type="button" className="text-xs hover:underline">
                  Forgot password?
                </button>
              </div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="*****"
                className="w-full px-3 py-2 border rounded-md text-gray-700 transition-transform border-gray-400 outline-none"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@#]{8,}$/,
                    message:
                      "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and only allow @ and #",
                  },
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters long",
                  },
                  maxLength: {
                    value: 20,
                    message: "Password cannot exceed 20 characters",
                  },
                })}
              />
              {errors.password && <p role="alert">{errors.password.message}</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="image" className="block text-[15px]">
                Your Image
              </label>
              <input
                type="file"
                name="image"
                id="image"
                accept="image/*"
                className="w-full px-3 py-2 border rounded-md text-gray-700 transition-transform border-gray-400 outline-none"
                {...register("image", { required: "Image is required" })}
              />
              {errors.image && <p role="alert">{errors.image.message}</p>}
            </div>
            <div className="w-full outline-none space-y-2 flex flex-col">
              <label htmlFor="role" className="text-[15]">
                Role selection
              </label>
              <select
                className="border border-gray-400 text-gray-700 outline-none py-2 px-2 rounded-md"
                {...register("role", { required: "Role is required" })}
              >
                <option defaultValue="Student">Student</option>
                <option value="Tutor">Tutor</option>
              </select>
              {errors.role && <p role="alert">{errors.role.message}</p>}
            </div>
          </div>
          <div>
            {!isSubmitting ? (
              <Button
                type="submit"
                className="font-normal capitalize h-12 text-base w-full"
              >
                Register
              </Button>
            ) : (
              <Button
                type="submit"
                className="font-normal h-12 w-full flex justify-center"
              >
                <FidgetSpinner
                  visible={true}
                  height="30"
                  width="30"
                  ariaLabel="fidget-spinner-loading"
                  wrapperStyle={{}}
                  wrapperClass="fidget-spinner-wrapper"
                />
              </Button>
            )}
          </div>
        </form>
        <div className="flex items-center w-full my-4">
          <hr className="w-full" />
          <p className="px-3">or</p>
          <hr className="w-full" />
        </div>
        <div className="my-6 space-y-0 flex gap-4">
          <Button
            aria-label="Google"
            className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md hover:bg-gray-900 transition-transform border-gray-400 hover:text-gray-300"
            onClick={googleSubmit}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="w-5 h-5 fill-current"
            >
              <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
            </svg>
            <p className="text-gray-300 text-base capitalize font-normal">
              Google
            </p>
          </Button>
          <Button
            aria-label="GitHub"
            className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md hover:bg-gray-900 transition-transform border-gray-400 hover:text-gray-300"
            onClick={githubSubmit}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="w-5 h-5 fill-current"
            >
              <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
            </svg>
            <p className="text-gray-300 text-base capitalize font-normal">
              GitHub
            </p>
          </Button>
        </div>
      </div>
      <ScrollRestoration />
    </div>
  );
};

export default Registration;
