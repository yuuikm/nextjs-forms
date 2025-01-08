import React from "react";
import { Skeleton } from "./ui/skeleton";
import { Form } from "@prisma/client";
import Link from "next/link";
import { EyeOpenIcon } from "@radix-ui/react-icons";
import axios from "axios";
import router from "next/router";
import { Button } from "./ui/button";
import { toast } from "react-toastify";

export const FormCardSkeleton = () => {
  return <Skeleton className="border-2 border-primary-/20 h-[190px] w-full" />;
};

const FormCard = ({ formData }: { formData: Form }) => {
  const date = new Date(formData.createdAt);

  const handleDeleteForm = async (formId: number) => {
    const confirmDeletion = confirm(
      "Are you sure you want to delete this form?"
    );
    if (!confirmDeletion) return;

    try {
      const resp = await axios.delete(`/api/createform?id=${formId}`);
      console.log("Form deleted successfully:", resp.data);
      toast.success("Form deleted successfully!");
      router.reload();
    } catch (error) {
      console.error("Error deleting form:", error);
      toast.error("Error deleting form.");
    }
  };

  return (
    <div
      style={{ border: "1px solid #d5cdcd" }}
      className="flex px-6 py-3 flex-col items-stretch rounded-xl gap-1"
    >
      <div className="title flex justify-between">
        <h1 className="font-semibold capitalize text-xl from-neutral-800">
          {formData.name}
        </h1>
        {formData.published ? (
          <span className="bg-green-600 px-2 py-1 text-white font-medium rounded-md">
            Published
          </span>
        ) : (
          <span className="bg-red-600 px-2 py-1 text-white font-medium rounded-md">
            Draft
          </span>
        )}
      </div>
      <div className="stats flex justify-between">
        <span>{date.toDateString()}</span>
        <div className="views">
          <span className="flex items-center gap-2">
            <EyeOpenIcon />
            <span className="font-semibold font-sans">{formData.visits}</span>
          </span>
        </div>
      </div>
      <div className="description text-gray-400 font-medium">
        {formData.description}
      </div>
      <div className={"flex items-center mt-auto justify-between gap-2"}>
        {formData.published && (
          <Link
            href={`/formdetails/${formData.id}`}
            type="button"
            className="flex w-11/12 rounded-md gap-2 bg-indigo-500 hover:bg-indigo-600 p-2 text-white font-medium text-lg justify-center items-center"
          >
            View Submission
          </Link>
        )}

        {!formData.published && (
          <Link
            href={`/form/${formData.id}`}
            type="button"
            className="flex w-11/12 rounded-md gap-2 bg-indigo-500 hover:bg-indigo-600 p-2 text-white font-medium text-lg justify-center items-center"
          >
            Edit Form
          </Link>
        )}

        <Button
          onClick={() => handleDeleteForm(formData.id)}
          className="flex rounded-md bg-red-500 hover:bg-red-600 p-2 text-white font-medium text-lg justify-center items-center h-full"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default FormCard;
