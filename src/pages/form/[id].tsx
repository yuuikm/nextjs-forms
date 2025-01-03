import prisma from "@/lib/prisma";
import React from "react";
import { Form } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import FormBuilder from "@/components/FormBuilder";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const id = context.query.id as string;

  try {
    const form = await prisma.form.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (form) {
      return {
        props: {
          form: JSON.parse(JSON.stringify(form)),
        },
      };
    } else {
      return {
        props: {
          form: {},
        },
      };
    }
  } catch (error) {
    console.error(error);
    return {
      props: {
        form: {},
      },
    };
  }
}

const Builder = ({ form }: { form: Form }) => {
  console.log(form);
  return <FormBuilder form={form} />;
};

export default Builder;
