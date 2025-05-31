import { NextResponse } from "next/server";
import { updateUser } from "@/app/lib/database"; // Gantilah dengan fungsi update dari DB-mu

export async function PUT(req) {
  try {
    const data = await req.json();
    const updatedUser = await updateUser(data); // Simpan perubahan ke database
    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ error: "Gagal memperbarui akun" }, { status: 500 });
  }
}