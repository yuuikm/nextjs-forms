import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "@/lib/prisma";

export type ResponseData={
    status:boolean,
    message:string,
    data: Record<string, unknown> | null;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
  ) {
    switch (req.method) {
        case "PATCH":
            const content = req.body.content;
            const formUrl = req.body.shareURL;
            const form = await prisma.form.update({
                data: {
                  submissions: {
                    increment: 1,
                  },
                  FormSubmissions: {
                    create: {
                      content,
                    },
                  },
                },
                where: {
                  shareURL: formUrl,
                  published: true,
                },
              });
              res.status(200).json({status:true,message:"Form Created Successfully",data:form});
            break;
    
        default:
            break;
    }
  }