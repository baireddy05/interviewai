import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const {
      question,
      answer,
    } = body;

    const completion =
      await openai.chat.completions.create({

        model: "openai/gpt-3.5-turbo",

        messages: [

          {
            role: "system",

            content: `
            You are an expert technical interviewer.

            Analyze interview answers professionally.
            `,
          },

          {
            role: "user",

            content: `
            Interview Question:
            ${question}

            Candidate Answer:
            ${answer}

            Give response in this format:

            Score: X/10

            Strengths:
            - point
            - point

            Improvements:
            - point
            - point

            Final Feedback:
            short paragraph
            `,
          },

        ],

      });

    return NextResponse.json({

      feedback:
        completion.choices[0].message.content,

    });

  } catch (error: any) {

    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );

  }

}