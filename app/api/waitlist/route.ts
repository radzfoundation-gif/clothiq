import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
    const { email, honeypot } = await request.json();

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        console.error("RESEND_API_KEY is not configured.");
        return NextResponse.json({ error: "Email configuration missing on server." }, { status: 500 });
    }

    const resend = new Resend(apiKey);

    // 1. SPAM CHECK: Honeypot
    if (honeypot) {
        // Silently success for bots to fool them
        return NextResponse.json({ message: "You're on the list!" }, { status: 200 });
    }

    // 2. VALIDATION: Check for empty or invalid email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    const supabase = await createClient();

    // 1. Insert into Supabase
    const { error: dbError } = await supabase
        .from('waitlist')
        .insert([{ email }]);

    if (dbError) {
        if (dbError.code === '23505') { // Unique violation
            return NextResponse.json({ message: 'You are already on the list!' }, { status: 200 });
        }
        return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    // 2. Send Email via Resend
    try {
        const { data, error: emailError } = await resend.emails.send({
            from: 'ClothIQ <onboarding@resend.dev>', // User acts as sender, easy default for dev
            to: [email],
            subject: 'Welcome to ClothIQ Early Access!',
            html: `
        <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6; color: #333;">
          <h1>Welcome to the future of fashion.</h1>
          <p>Thanks for joining the ClothIQ waitlist!</p>
          <p>You've secured your spot to be among the first to experience our AI-powered virtual try-on technology.</p>
          <p>We'll notify you as soon as your access is ready.</p>
          <br/>
          <p>Cheers,<br/>The ClothIQ Team</p>
        </div>
      `,
        });

        if (emailError) {
            console.error('Resend Error:', emailError);
            // We don't fail the request if email fails, but we log it.
            // Ideally we might want to let the user know, but the signup was successful.
        } else {
            console.log('Email sent successfully:', data);
        }
    } catch (error) {
        console.error('Email Sending Error:', error);
    }

    return NextResponse.json({ message: "You're on the list!" }, { status: 200 });
}
