/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, Fragment, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter, useSearchParams } from "next/navigation";
import { API_URL_artikel } from "@/constants";
import { useGetData, usePostData, usePutData } from "@/actions";
import slugify from "slugify";
import { showToast } from "@/utils/showToast";
import { errorResponse } from "@/utils/errorResponse";
import { decrypted } from "@/utils/crypto";
import { CKEditor } from "ckeditor4-react";
import { TbLoader } from "react-icons/tb";
import { InputField, SelectInput } from "@/components";

const FormArtikel: React.FC = () => {
  const router = useRouter();
  const param = useSearchParams();
  const [plainId, setPlainId] = useState("");
  const [isLoadingCkeditor, setLoadingCkeditor] = useState(true);
  const [refreshCkeditor, setRefreshCkeditor] = useState(false);

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // API actions
  const createArtikelApi = usePostData(API_URL_artikel, true);
  const updateArtikelApi = usePutData(API_URL_artikel + plainId + "/", true);
  const getArtikelApi = useGetData(`${API_URL_artikel + plainId + "/"}`,
    [plainId],
    true,
    {},
    { enabled: !!plainId });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      title: "",
      image: "",
      content: "",
      status: "published",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Judul harus diisi"),
      image: Yup.string().nullable(),
      content: Yup.string().required("Konten harus diisi"),
      status: Yup.string().oneOf(["published", "draft"], "Invalid status").required("Status harus diisi"),
    }),
    onSubmit: (values) => {
      const form = new FormData();
      form.append("title", values.title);
      form.append("content", values.content);
      form.append("status", values.status);
      form.append("slug", slugify(values.title, { lower: true, strict: true }));

      if (values.image) {
        form.append("image", values.image); // Only append if an image is provided
      }

      if (plainId) {
        // Update existing article
        updateArtikelApi.mutate(form, {
          onSuccess: (res) => {
            const data = res as { message: string };
            showToast(data.message, "success", 3000);
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
        createArtikelApi.mutate(form, {
          onSuccess: (res) => {
            const data = res as { message: string };
            showToast(data.message, "success", 3000);
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
      formik.setFieldValue("image", null); // Reset menjadi null untuk menghindari kesalahan
      setImagePreview(getArtikelApi.data?.image || null);
      formik.setFieldValue("status", getArtikelApi.data?.status);
    }
  }, [getArtikelApi.isSuccess]);

  useEffect(() => {
    if (formik.values.content && plainId) {
      setRefreshCkeditor(true);
    }
  }, [formik.values.content, plainId]);

  // Handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      formik.setFieldValue("image", file); // Simpan file
    } else {
      formik.setFieldValue("image", null); // Reset jika tidak ada file
    }
  };

  return (
    <Fragment>
      <div className="flex justify-between items-center">
        <h1 className="text-lg md:text-3xl font-bold transition-all">
          <span>{param.get("id") ? "Edit" : "Tambah"}</span> Artikel
        </h1>
        <button
          className="text-xs whitespace-nowrap font-medium px-3 py-2 bg-[#1e293b] hover:bg-[#0f172a] text-white rounded-lg shadow hover:shadow-lg transition-all"
          onClick={() => router.push("/artikel")}
        >
          Kembali
        </button>
      </div>
      <br />

      {/* Form Content */}
      <form onSubmit={formik.handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex flex-col-reverse lg:flex-row gap-6 mb-4">
          <div className="w-full lg:w-7/10">
            <InputField
              label="Judul Artikel"
              id="title"
              name="title"
              type="text"
              placeholder="Masukan Judul"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && formik.errors.title}
              required={true}
            />
          </div>
          <div className="w-full lg:w-3/10">
            <SelectInput
              label="Status"
              id="status"
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              options={[
                { label: 'Published', value: 'published' },
                { label: 'Draft', value: 'draft' },
              ]}
              error={formik.touched.status && formik.errors.status}
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
                <img src={imagePreview} alt="Image Preview" className="w-full h-auto rounded-lg" />
              </div>
            )}
          </div>

          {/* Content */}
          <div>
            {isLoadingCkeditor && (
              <div className="bg-black bg-opacity-10 flex justify-center items-center">
                <TbLoader className="text-[#42526B] animate-spin" size={100} />
              </div>
            )}
            <label className="text-[#42526B] font-normal tracking-wide text-sm">
              Konten<span className="text-red-500">*</span>
            </label>
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
              onChange={(e: CKEDITOR.eventInfo) => formik.setFieldValue("content", e.editor.getData())}
            />
            {formik.touched.content && formik.errors.content && (
              <div className="text-red-500 text-sm">{formik.errors.content}</div>
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

export default FormArtikel;
