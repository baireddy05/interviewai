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
      role,
      difficulty,
      topic,
      previousQuestions,
    } = body;

    const completion =
      await openai.chat.completions.create({

        model: "openai/gpt-3.5-turbo",

        messages: [

          {
            role: "system",

            content: `
            You are a professional technical interviewer.

            Generate realistic interview questions.

            Avoid repeating questions.
            `,
          },

          {
            role: "user",

            content: `
            Generate ONE interview question.

            Role: ${role}
            Difficulty: ${difficulty}
            Topic: ${topic}

            Previous Questions:
            ${previousQuestions?.join('\n')}

            Rules:
            - Ask only ONE question
            - No numbering
            - No explanations
            - Keep it realistic
            `,
          },

        ],

      });

    return NextResponse.json({

      question:
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