import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";
import speakeasy from "speakeasy";
import QRCode from "qrcode";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return new Response("User exists", { status: 400 });

  const hashed = await hashPassword(password);

  const secret = speakeasy.generateSecret({
    name: `TaskManager (${email})`,
  });

  const user = await prisma.user.create({
    data: {
      email,
      password: hashed,
      twoFactorEnabled: true,
      twoFactorSecret: secret.base32,
    },
  });

  const qr = await QRCode.toDataURL(secret.otpauth_url!);

  return Response.json({ qr, secret: secret.base32 });
}
