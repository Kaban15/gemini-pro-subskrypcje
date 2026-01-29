import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // Walidacja
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Wszystkie pola są wymagane" },
        { status: 400 }
      );
    }

    // Wysłanie emaila
    const { data, error } = await resend.emails.send({
      from: "Gemini Pro SaaS <onboarding@resend.dev>",
      to: "prolifefit777@gmail.com",
      replyTo: email,
      subject: `Nowe zapytanie od ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #8b5cf6;">Nowe zapytanie z formularza kontaktowego</h2>
          <hr style="border: 1px solid #e4e4e7;" />
          <p><strong>Imię:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Wiadomość:</strong></p>
          <div style="background-color: #f4f4f5; padding: 16px; border-radius: 8px;">
            <p style="white-space: pre-wrap; margin: 0;">${message}</p>
          </div>
          <hr style="border: 1px solid #e4e4e7; margin-top: 24px;" />
          <p style="color: #71717a; font-size: 12px;">
            Ta wiadomość została wysłana z formularza kontaktowego Gemini Pro SaaS.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Nie udało się wysłać wiadomości" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Wystąpił błąd serwera" },
      { status: 500 }
    );
  }
}
