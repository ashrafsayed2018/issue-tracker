
import prisma from "@/prisma/client"
import { NextRequest, NextResponse } from "next/server"
import { createIssueSchema } from "../../validationSchemas"

export async function POST(request:NextRequest) {
 const body = await  request.json()
 const validation = createIssueSchema.safeParse(body);
 // if there is error in validation
 if(!validation.success) {
    return NextResponse.json(validation.error.format(),{status:400});
 }

//  store the issue in the database

const newIssue = await prisma.issue.create({
    data: {title:body.title,description:body.description}
})
return NextResponse.json(newIssue,{status:201})
}

