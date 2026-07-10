import { connection, NextRequest, NextResponse } from "next/server";
import { getRequiredEnv, publicError } from "@/lib/env";
import { buildDailyReport } from "@/lib/report";
import { sendDailyReportEmail } from "@/lib/email";

export async function GET(request: NextRequest) {
  await connection();
  const cronSecret = getRequiredEnv("CRON_SECRET");
  const authHeader = request.headers.get("authorization");

  if (authHeader !== `Bearer ${cronSecret}`) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  try {
    const report = await buildDailyReport();
    const emailId = await sendDailyReportEmail(report);

    return NextResponse.json({
      ok: true,
      reportDate: report.reportDate,
      emailId,
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: publicError(error),
      },
      {
        status: 500,
      },
    );
  }
}
