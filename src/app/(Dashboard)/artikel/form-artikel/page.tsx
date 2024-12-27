/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, Fragment, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter, useSearchParams } from "next/navigation";
import { API_URL_artikel } from "@/constants";
import { useGetData, usePostData, usePutData } from "@/actions";
import { showToast } from "@/utils/showToast";
import { errorResponse } from "@/utils/errorResponse";
import { decrypted } from "@/utils/crypto";
import { CKEditor } from "ckeditor4-react";
import { TbLoader } from "react-icons/tb";

const FormArtikel: React.FC = () => {
  const router = useRouter();
  const param = useSearchParams();
  const [plainId, setPlainId] = useState("");
  const [isLoadingCkeditor, setLoadingCkeditor] = useState(true);
  const [refreshCkeditor, setRefreshCkeditor] = useState(false);

  // API actions
  const createArtikelApi = usePostData(API_URL_artikel, true);
  const updateArtikelApi = usePutData(API_URL_artikel + plainId + "/", true);
  const getArtikelApi = useGetData(`${API_URL_artikel + plainId + "/"}`, [plainId], true, {}, { enabled: !!plainId });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      title: "",
      image: "",
      content: "",
      status: "publish",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      content: Yup.string().required("Content is required"),
      image: Yup.string().required("Image is required"),
      status: Yup.string().oneOf(["publish", "draft"], "Invalid status").required("Status is required"),
    }),
    onSubmit: (values) => {
      const form = new FormData();
      form.append("title", values.title);
      form.append("content", values.content);
      form.append("image", values.image);
      form.append("status", values.status);

      if (plainId) {
        // Update existing article
        updateArtikelApi.mutate(form as any, {
          onSuccess: (res: any) => {
            showToast(res.message, "success", 3000);
            router.push("/artikel");
            formik.resetForm(); // Reset form on success
          },
          onError: (error) => {
            console.log(error);
            errorResponse(error);
          },
        });
      } else {
        // Create new article
        createArtikelApi.mutate(form as any, {
          onSuccess: (res: any) => {
            showToast(res.message, "success", 3000);
            router.push("/artikel");
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

  // CKEditor config
  const toolbarConfig = {
    extraPlugins: "font,colorbutton,colordialog,justify,image2",
    removePlugins: "about,image",
    skin: "moono",
    height: "500",
  };

  // Event handler when CKEditor is ready
  const onEditorReady = () => {
    setLoadingCkeditor(false); // Hide loading indicator
  };

  // Collect data when editing
  useEffect(() => {
    if (param.get("id")) {
      const id = decrypted(param.get("id"));
      setPlainId(id);
    }
  }, [param]);

  // Set form values when data is fetched
  useEffect(() => {
    if (getArtikelApi.isSuccess && getArtikelApi.data) {
      formik.setFieldValue("title", getArtikelApi.data?.title);
      formik.setFieldValue("content", getArtikelApi.data?.content);
      formik.setFieldValue("image", getArtikelApi.data?.image);
      formik.setFieldValue("status", getArtikelApi.data?.status);
    }
  }, [getArtikelApi.isSuccess]);

  useEffect(() => {
    if (formik.values.content && plainId) {
      setRefreshCkeditor(true);
    }
  }, [formik.values.content, plainId]);

  return (
    <Fragment>
      <div className="flex justify-between items-center">
        <h1 className="text-lg md:text-3xl font-bold transition-all">
          <span>{param.get("id") ? "Edit" : "Tambah"}</span> Artikel
        </h1>
        <button
          className="text-xs whitespace-nowrap font-medium px-3 py-2 bg-gray-500 hover:bg-gray-600 active:bg-gray-600 text-white rounded-lg shadow hover:shadow-lg transition-all"
          onClick={() => router.push("/artikel")}
        >
          Kembali
        </button>
      </div>
      <br />

      {/* Form Content */}
      <form onSubmit={formik.handleSubmit} className="m-2 flex flex-col-reverse lg:flex-row gap-4">
        <div className="bg-white p-3 rounded-lg space-y-4 w-full lg:w-[70%]">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan Title"
            />
            {formik.touched.title && formik.errors.title && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.title}</div>
            )}
          </div>

          {/* Content */}
          <div>
            {isLoadingCkeditor && (
              <div className="bg-black bg-opacity-10 flex justify-center items-center ">
                <TbLoader className="text-fuchsia-600 animate-spin" size={100} />
              </div>
            )}
            <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
            <CKEditor
              scriptUrl="https://cdn.ckeditor.com/4.20.0/full/ckeditor.js"
              key={refreshCkeditor}
              config={{
                toolbarConfig,
                versionCheck: false
              }}
              type="classic"
              initData={formik.values.content}
              onInstanceReady={onEditorReady}
              onChange={(e: any) => formik.setFieldValue("content", e.editor.getData())}
            />
            {formik.touched.content && formik.errors.content && (
              <div className="text-red-500 dark:text-red-300 text-xs">{formik.errors.content}</div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="text-xs md:col-span-2 w-fit px-3 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Submit
          </button>
        </div>

        {/* Status Section */}
        <div className="bg-white p-3 rounded-lg space-y-4 w-full lg:w-[30%] h-fit">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="publish">Publish</option>
              <option value="draft">Draft</option>
            </select>
            {formik.touched.status && formik.errors.status && (
              <div className="text-red-500 text-sm mt-1">{formik.errors.status}</div>
            )}
          </div>
        </div>
      </form>
    </Fragment>
  );
};

export default FormArtikel;
