import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";

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
      try {
        const { content } = req.body;

        const queryString = req?.url?.split("?")[1];
        const searchParams = new URLSearchParams(queryString);
        const id = searchParams.get("formid");

        if (!id) {
          return res
            .status(400)
            .json({
              status: false,
              message: "Form ID is required",
              data: null,
            });
        }

        const user = getAuth(req);

        if (!user?.userId) {
          return res
            .status(401)
            .json({ status: false, message: "Unauthorized", data: null });
        }

        const userId = user.userId;

        const form = await prisma.form.update({
          data: {
            published: true,
            content: JSON.stringify(content),
          },
          where: {
            userId,
            id: parseInt(id, 10),
          },
        });

        if (!form) {
          return res.status(500).json({
            status: false,
            message: "Something went wrong while updating the form",
            data: null,
          });
        }

        return res.status(200).json({
          status: true,
          message: "Form Published Successfully",
          data: form,
        });
      } catch (error) {
        console.error(error);
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
          data: null,
        });
      }

    default:
      return res
        .status(405)
        .json({ status: false, message: "Method Not Allowed", data: null });
  }
}
