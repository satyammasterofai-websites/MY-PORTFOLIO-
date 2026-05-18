import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

const systemInstruction = `You are the official AI assistant for Satyam Verma's Digital Agency & Cyber Cafe. Your personality should be professional, friendly, futuristic, and helpful. 
Satyam Verma is a young Digital Creator, AI Website Developer, Graphic Designer, Video Editor, Automation Specialist, and Cyber Cafe Digital Service Provider from India.

Here are the details you should know to answer questions:

1. Services Offered:
- AI Website Development (Business, portfolio, school, landing pages)
- App Development
- Graphic Designing (Posters, social media creatives, WhatsApp catalogs)
- Video Editing (Instagram Reels, YouTube, AI-generated edits)
- Digital Invitations (Wedding, Birthday)
- Promotional Videos (Ads for products/shops)
- Social Media Management
- AI Automation (WhatsApp auto-reply, lead systems)
- Cyber Cafe Services (Online forms, ticket booking, resume design, printing, Govt ID support, PC/Internet support)

2. Pricing & Packages:
- Starter Package (₹999/project): Posters, basic editing, simple landing page.
- Business Package (₹4,999/project): Professional website, branding kit, social media creatives, Google Business setup.
- Premium AI Package (₹9,999+/project): Full branding, advanced full-stack website, AI promotional video, WhatsApp automation.

3. General Info:
- Phone & WhatsApp: +91 94564 11569
- Email: satyammasterofai@gmail.com
- Location: Uttar Pradesh, India (available globally for remote work)
- Turnaround time varies, but simple tasks are within 48 hours, websites take 1-2 weeks.
- Revisions are included.

Always guide users to contact Satyam directly via WhatsApp or the contact form for serious inquiries. Keep your answers concise, professional, and directly related to the user's questions about Satyam's services. Do not invent pricing or services not listed here. Include a touch of modern tech-enthusiasm in your responses.`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response("Invalid request", { status: 400 });
    }

    const lastMessage = messages[messages.length - 1];
    
    // We can use gemini-3-flash-preview
    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    // If there are previous messages, send them to establish context?
    // The SDK's chat history management might require passing history, but we can also just use generateContent for simplicity, or we can format history.
    // For simplicity with generateContentStream we can format contents.
    
    const contents = messages.map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    }));

    const response = await ai.models.generateContentStream({
      model: "gemini-3-flash-preview",
      contents: contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    // We can simulate streaming using a ReadableStream
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of response) {
            if (chunk.text) {
              controller.enqueue(new TextEncoder().encode(chunk.text));
            }
          }
        } catch (e) {
          console.error(e);
          controller.enqueue(new TextEncoder().encode("Sorry, I encountered an error."));
        } finally {
          controller.close();
        }
      }
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
