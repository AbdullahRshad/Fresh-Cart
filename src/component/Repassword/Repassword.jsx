import axios from "axios";
import { useFormik } from "formik";
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Authcontext } from "../Authcontext/Authcontext";
import { Helmet } from "react-helmet";

export default function Repassword() {
  const [isLoading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const { setUserToken } = useContext(Authcontext);
  ///////////////validation yup
  const validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Enter valid email"),
      newPassword: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Minimum eight characters, at least one letter, one number and one special character:"
      ),
  });

  /////////////// api function
  async function handelNewPass() {
    setLoading(true);
    setErrorMsg("");

    await axios
      .put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", values)
      .then((data) => {
        console.log(data);
        if (data.data.token) {
            navigate("/login")
        }
        
      })
      .catch((error) => {
        setLoading(false);
        setErrorMsg(error.response.data.message);
      });
  }

  ////////////////formik
  let { handleSubmit, values, handleChange, errors, touched, handleBlur } =
    useFormik({
      initialValues: {
        email: "",
        newPassword: "",
      },
      onSubmit:handelNewPass,
      validationSchema,
    });

  return (<>
<Helmet>
  <title>New password</title>
</Helmet>

<div className="pt-9 flex items-center justify-center">
      <div className="w-full md:w-1/2 lg:w-1/3 mx-auto  bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
        <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">
         New password
        </h1>
        <form
          onSubmit={handleSubmit}
          action="#"
          className="w-full flex flex-col gap-4"
        >
          <div className="flex items-start flex-col justify-start">
            <label
              htmlFor="email"
              className="text-sm text-gray-700 dark:text-gray-200 mr-2"
            >
              Email:
            </label>
            <input
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              type="email"
              id="email"
              name="email"
              className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {touched.email && errors.email && (
              <p className="text-red-500">{errors.email}</p>
            )}
          </div>

          <div className="flex items-start flex-col justify-start">
            <label
              htmlFor="password"
              className="text-sm text-gray-700 dark:text-gray-200 mr-2"
            >
              newPassword:
            </label>
            <input
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              type="newPassword"
              id="newPassword"
              name="newPassword"
              className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {touched.newPassword && errors.newPassword && (
              <p className="text-red-500">{errors.newPassword}</p>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-gray-500"
            disabled={isLoading}
          >
            Confirm {isLoading && <i className="fas fa-spinner fa-spin"></i>}
          </button>
          <p className="text-red-500 text-center">{errorMsg}</p>
        </form>
      </div>
    </div>
  </>

  );
}
