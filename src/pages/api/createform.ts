import type { NextApiRequest, NextApiResponse } from "next";
import { formSchema } from "../../../schema/form";
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
    case "POST":
      try {
        const body = req.body;

        const validation = formSchema.safeParse(body);
        if (!validation.success) {
          return res
            .status(400)
            .json({ status: false, message: "Form not valid", data: null });
        }

        const user = getAuth(req);

        if (!user?.userId) {
          return res
            .status(401)
            .json({ status: false, message: "Unauthorized", data: null });
        }

        const { name, description } = body;

        const form = await prisma.form.create({
          data: {
            userId: user.userId,
            name,
            description,
          },
        });

        if (!form) {
          throw new Error("Something went wrong");
        }

        return res.status(200).json({
          status: true,
          message: "Form Created Successfully",
          data: form,
        });
      } catch {
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
