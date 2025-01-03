// pages/api/forms.ts
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = req.query;

  if (typeof userId !== "string") {
    res.status(400).json({ error: "Invalid userId" });
    return;
  }

  try {
    const forms = await prisma.form.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
