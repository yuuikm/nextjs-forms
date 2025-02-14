import StatCard from "@/components/StatCard";
import React, { Suspense, useState } from "react";
import { CardData } from "@/data";
import Modal from "@/components/Modal";
import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { FormCardSkeleton } from "@/components/FormCard";
import FetchForms from "@/components/FetchForms";
import { GetServerSidePropsContext } from "next";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const user = getAuth(context.req);
  if (!user.userId) {
    return {
      props: {
        forms: [],
        userId: null,
      },
    };
  }

  try {
    const forms = await prisma.form.findMany({
      where: {
        userId: user.userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      props: {
        forms: JSON.parse(JSON.stringify(forms)),
        userId: user.userId,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        forms: [],
        userId: user.userId,
      },
    };
  }
}

const Forms = ({
  forms,
  userId,
}: {
  forms: {
    id: number;
    userId: string;
    createdAt: Date;
    published: boolean;
    name: string;
    description: string;
    content: string;
    visits: number;
    submissions: number;
    shareURL: string;
  }[];
  userId: string | null;
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const totalVisits = forms.reduce((sum, form) => sum + form.visits, 0);
  const totalValue = forms.reduce((sum, form) => sum + form.submissions, 0);

  return (
    <div className={` relative flex justify-center `}>
      {open && <Modal setOpen={setOpen} />}
      <div
        className={`py-12 md:px-24 px-4 w-full backdrop-blur-xl ${
          open ? "blur-div" : ""
        }`}
      >
        <div className="grid lg:grid-cols-4 lg:grid-rows-1 md:grid-cols-2 md:grid-rows-2 grid-cols-1 gap-y-6 gap-x-8 place-items-center w-full">
          {CardData.map((e) => (
            <StatCard
              key={e.title}
              {...e}
              value={totalValue}
              visits={totalVisits}
            />
          ))}
        </div>

        <div
          data-orientation="horizontal"
          role="none"
          className="shrink-0 bg-border h-[1px] w-full my-6"
        ></div>
        <h1 className="text-4xl leading-10 font-bold">Your Forms</h1>
        <div
          data-orientation="horizontal"
          role="none"
          className="shrink-0 bg-border h-[1px] w-full my-6"
        ></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <button
            style={{ minHeight: "150px" }}
            onClick={() => setOpen(!open)}
            className="rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground px-4 py-2 group border border-primary/20 h-[190px] items-center justify-center flex flex-col hover:border-primary hover:cursor-pointer border-dashed gap-4"
            type="button"
            aria-haspopup="dialog"
            aria-expanded="false"
            aria-controls="radix-:r4:"
            data-state="closed"
          >
            <p className="font-bold text-xl text-muted-foreground group-hover:text-primary">
              Create new form
            </p>
          </button>
          {userId ? (
            <Suspense
              fallback={[1, 2, 3, 4].map((e) => (
                <FormCardSkeleton key={e} />
              ))}
            >
              <FetchForms userId={userId} />
            </Suspense>
          ) : (
            <p className="text-center col-span-3">
              You must be logged in to view your forms.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Forms;
