import { Router, type IRouter } from "express";
import {
  SubmitTechCareRequestBody,
  SubmitTechCareRequestResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/tech-care/requests", async (req, res): Promise<void> => {
  const parsed = SubmitTechCareRequestBody.safeParse(req.body);
  if (!parsed.success || !parsed.data.full_name.trim() || !parsed.data.phone.trim()) {
    res.status(400).json({ error: "Please check your contact details and service choices." });
    return;
  }

  const webhookUrl = process.env.GHL_WEBHOOK_URL;
  if (!webhookUrl) {
    res.status(503).json({ error: "Tech Care requests are temporarily unavailable. Please try again later." });
    return;
  }

  // Never send the webhook destination to the browser or write it to logs.
  const {
    full_name,
    email,
    phone,
    tech_care_service,
    tech_care_city,
    customer_type,
    tech_care_detail,
    preferred_contact,
    best_time,
  } = parsed.data;
  const payload = {
    full_name: full_name.trim(),
    email: email.trim(),
    phone: phone.trim(),
    tech_care_service,
    tech_care_city,
    customer_type,
    tech_care_detail: tech_care_detail?.trim() ?? "",
    preferred_contact: preferred_contact ?? "",
    best_time: best_time?.trim() ?? "",
    tech_care_source: "replit-form",
  };

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(12000),
    });

    if (!response.ok) {
      req.log.warn({ status: response.status }, "Tech Care webhook rejected request");
      res.status(502).json({ error: "We could not send your request right now. Please try again later." });
      return;
    }

    res.json(SubmitTechCareRequestResponse.parse({ success: true }));
  } catch (error) {
    req.log.warn({ errorType: error instanceof Error ? error.name : "unknown" }, "Tech Care webhook unavailable");
    res.status(502).json({ error: "We could not send your request right now. Please try again later." });
  }
});

export default router;