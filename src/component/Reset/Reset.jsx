import axios from "axios";
import { useFormik } from "formik";
import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Authcontext } from "../Authcontext/Authcontext";
import { Helmet } from "react-helmet";

export default function Reset() {
  const [isLoading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  ///////////////validation yup
  const validationSchema = Yup.object({
    resetCode: Yup.string().required("resetCode is required")
  });

  /////////////// api function
  async function handleReset(values) {

    try {
            setLoading(true);
   let{data}= await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", values)
      console.log(data);
      
      if (data.status==='Success') {
        navigate('/repassword');
        setLoading(false);
      }

    } catch (error) {
        setLoading(false);
        setErrorMsg(error)
    }

      
  }

  ////////////////formik
  let { handleSubmit, values, handleChange, errors, touched, handleBlur } =
    useFormik({
      initialValues: {
        resetCode: "",
      },
      onSubmit:handleReset,
      validationSchema,
    });

  return (<>
<Helmet>
  <title>Verify Code</title>
</Helmet>

<div className="pt-9 flex items-center justify-center">
      <div className="w-full md:w-1/2 lg:w-1/3 mx-auto  bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
        <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">
        Verify Code
        </h1>
        <form
          onSubmit={handleSubmit}
          action="#"
          className="w-full flex flex-col gap-4"
        >
          <div className="flex items-start flex-col justify-start">
            <label
              htmlFor="resetCode"
              className="text-sm text-gray-700 dark:text-gray-200 mr-2"
            >
              Code:
            </label>
            <input
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.resetCode}
              type="resetCode"
              id="resetCode"
              name="resetCode"
              className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-gray-500"
            disabled={isLoading}
          >
            Send {isLoading && <i className="fas fa-spinner fa-spin"></i>}
          </button>
          <p className="text-red-500 text-center">{errorMsg}</p>
        </form>

      </div>
    </div>
  </>

  );
}
