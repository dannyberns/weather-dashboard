import { API_KEY, OPENWEATHER_BASE_URL } from "@/consts";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get("query");

    if (!city) {
      return NextResponse.json(
        { error: "City query is required" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${OPENWEATHER_BASE_URL}/find?q=${city}&appid=${API_KEY}`
    );
    const data = await response.json();

    return NextResponse.json(data.list);
  } catch (error) {
    console.error("Error fetching city data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
