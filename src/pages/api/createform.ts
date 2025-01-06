import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { getAuth } from "@clerk/nextjs/server";
import { formSchema } from "../../../schema/form";

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

    case "DELETE":
      try {
        const { id } = req.query;

        if (!id || isNaN(Number(id))) {
          return res
            .status(400)
            .json({ status: false, message: "Invalid form ID", data: null });
        }

        const formId = Number(id);

        const user = getAuth(req);

        if (!user?.userId) {
          return res
            .status(401)
            .json({ status: false, message: "Unauthorized", data: null });
        }

        const form = await prisma.form.findUnique({
          where: { id: formId },
          include: { FormSubmissions: true },
        });

        if (!form) {
          return res
            .status(404)
            .json({ status: false, message: "Form not found", data: null });
        }

        if (form.userId !== user.userId) {
          return res
            .status(403)
            .json({ status: false, message: "Forbidden", data: null });
        }

        if (form.FormSubmissions.length > 0) {
          await prisma.formSubmissions.deleteMany({
            where: { formId: formId },
          });
        }

        await prisma.form.delete({
          where: { id: formId },
        });

        return res.status(200).json({
          status: true,
          message: "Form deleted successfully",
          data: null,
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
