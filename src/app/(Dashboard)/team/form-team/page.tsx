"use client";

import React, { useState, Fragment, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter, useSearchParams } from "next/navigation";
import { API_URL_team } from "@/constants";
import { useGetData, usePostData, usePutData } from "@/actions";
import { showToast } from "@/utils/showToast";
import { errorResponse } from "@/utils/errorResponse";
import { decrypted } from "@/utils/crypto";
import { InputField } from "@/components";
import { FaTrash } from "react-icons/fa";

const FormTeam: React.FC = () => {
  const router = useRouter();
  const param = useSearchParams();
  const [plainId, setPlainId] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // API actions
  const createTeamApi = usePostData(API_URL_team, true);
  const updateTeamApi = usePutData(API_URL_team + plainId + "/", true);
  const getTeamApi = useGetData(`${API_URL_team + plainId + "/"}`, [plainId], true, {}, { enabled: !!plainId });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: "",
      image: "",
      position: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Nama harus diisi"),
      image: Yup.string().nullable(),
      position: Yup.string().required("Posisi harus diisi"),
    }),
    onSubmit: (values) => {
      const form = new FormData();
      form.append("name", values.name);
      form.append("position", values.position);

      if (values.image) {
        form.append("image", values.image); // Only append if an image is provided
      }

      if (plainId) {
        // Update existing team
        updateTeamApi.mutate(form as any, {
          onSuccess: (res: any) => {
            showToast(res.message, "success", 3000);
            router.push("/team");
            formik.resetForm(); // Reset form on success
          },
          onError: (error) => {
            console.log(error);
            errorResponse(error);
          },
        });
      } else {
        // Create new team
        createTeamApi.mutate(form as any, {
          onSuccess: (res: any) => {
            showToast(res.message, "success", 3000);
            router.push("/team");
            formik.resetForm(); // Reset form on success
          },
          onError: (error) => {
            console.log(error);
            errorResponse(error);
          },
        });
      }
    },
  });

  // Collect data when editing
  useEffect(() => {
    if (param.get("id")) {
      const id = decrypted(param.get("id"));
      setPlainId(id);
    }
  }, [param]);

  // Set form values when data is fetched
  useEffect(() => {
    if (getTeamApi.isSuccess && getTeamApi.data) {
      formik.setFieldValue("name", getTeamApi.data?.name);
      formik.setFieldValue("position", getTeamApi.data?.position);
      formik.setFieldValue("image", null); // Reset menjadi null untuk menghindari kesalahan
      setImagePreview(getTeamApi.data?.image || null);
    }
  }, [formik, getTeamApi.isSuccess, getTeamApi.data]);

  // Handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      formik.setFieldValue("image", file); // Save the file
    } else {
      formik.setFieldValue("image", null); // Reset if no file is selected
    }
  };

  // Handle image delete
  const handleImageDelete = () => {
    setImagePreview(null); // Clear preview
    formik.setFieldValue("image", null); // Reset the image field in Formik
  };

  return (
    <Fragment>
      <div className="flex justify-between items-center">
        <h1 className="text-lg md:text-3xl font-bold transition-all">
          <span>{param.get("id") ? "Edit" : "Tambah"}</span> Tim
        </h1>
        <button
          className="text-xs whitespace-nowrap font-medium px-3 py-2 bg-[#1e293b] hover:bg-[#0f172a] text-white rounded-lg shadow hover:shadow-lg transition-all"
          onClick={() => router.push("/team")}
        >
          Kembali
        </button>
      </div>
      <br />

      {/* Form Content */}
      <form onSubmit={formik.handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex flex-col lg:flex-row gap-6 mb-4">
          <div className="w-full">
            <InputField
              label="Nama"
              id="name"
              name="name"
              type="text"
              placeholder="Masukan Nama"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && formik.errors.name}
              required={true}
            />
          </div>
          <div className="w-full">
            <InputField
              label="Posisi"
              id="position"
              name="position"
              type="text"
              placeholder="Masukan Posisi"
              value={formik.values.position}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.position && formik.errors.position}
              required={true}
            />
          </div>
        </div>

        <div className="space-y-4 w-full">
          {/* Image Upload */}
          <div>
            <label className="text-[#42526B] font-normal tracking-wide text-sm">Image</label>
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              onBlur={formik.handleBlur}
              accept="image/*"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {formik.touched.image && formik.errors.image && (
              <div className="text-red-500 text-sm">{formik.errors.image}</div>
            )}

            {/* Image Preview */}
            {imagePreview && (
              <div className="mt-2">
                <button
                  type="button"
                  onClick={handleImageDelete}
                  className="text-white flex items-center gap-2 rounded-md mb-2 bg-red-600 p-2 px-4 text-sm"
                >
                  <FaTrash />
                  <span>Hapus Gambar</span>
                </button>
                <img src={imagePreview} alt="Image Preview" className="w-40 h-40 object-cover mx-auto rounded-full bg-black" />
                {/* Delete button for image */}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-[#1e293b] hover:bg-[#0f172a] text-white font-semibold rounded-lg transition-colors"
          >
            Submit
          </button>
        </div>
      </form>
    </Fragment>
  );
};

export default FormTeam;
