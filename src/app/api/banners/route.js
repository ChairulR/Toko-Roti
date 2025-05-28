export async function GET() {
  try {
    const banners = await prisma.banner.findMany();
    return new Response(JSON.stringify(banners), { status: 200 });
  } catch (error) {
    console.error("Error fetching banners:", error);
    return new Response(JSON.stringify({ error: "Terjadi kesalahan saat mengambil data banner" }), { status: 500 });
  }
}