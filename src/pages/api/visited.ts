import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export type ResponseData = {
  status: boolean;
  message: string;
  data: Record<string, unknown> | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  switch (req.method) {
    case "PATCH":
      const queryString = req?.url?.split("?")[1];

      const searchParams = new URLSearchParams(queryString);

      const id = searchParams.get("formid");
      if (!id) return;

      const form = await prisma.form.update({
        where: {
          id: parseInt(id),
        },
        data: {
          visits: { increment: 1 },
        },
      });

      if (!form) {
        throw new Error("something went wrong");
      }
      res.status(200).json({
        status: true,
        message: "Form Saved Successfully",
        data: form,
      });
      break;

    default:
      break;
  }
}
