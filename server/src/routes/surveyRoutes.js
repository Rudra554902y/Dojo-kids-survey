import { Router } from "express";
import { z } from "zod";
import { SurveyResponse } from "../models/SurveyResponse.js";

const surveyRouter = Router();

const submitSurveyBodySchema = z.object({
  respondentType: z.enum(["parent", "kid", "teacher"]),
  name: z.string().optional().nullable(),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")).nullable(),
  interestLevel: z.number().min(1).max(10),
  wouldUse: z.boolean(),
  biggestConcern: z.string().optional().nullable(),
  wantedFeature: z.string().optional().nullable(),
  whatWouldCreate: z.string().optional().nullable(),
  openFeedback: z.string().optional().nullable(),
  featureSuggestion: z.string().optional().nullable(),
});

const normalizeOptional = (value) => {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  return value;
};

surveyRouter.post("/survey", async (req, res) => {
  const parseResult = submitSurveyBodySchema.safeParse(req.body);
  if (!parseResult.success) {
    res.status(400).json({
      error: "Invalid input",
      details: parseResult.error.flatten(),
    });
    return;
  }

  const data = parseResult.data;

  const created = await SurveyResponse.create({
    respondentType: data.respondentType,
    name: normalizeOptional(data.name),
    email: normalizeOptional(data.email),
    interestLevel: data.interestLevel,
    wouldUse: data.wouldUse,
    biggestConcern: normalizeOptional(data.biggestConcern),
    wantedFeature: normalizeOptional(data.wantedFeature),
    whatWouldCreate: normalizeOptional(data.whatWouldCreate),
    openFeedback: normalizeOptional(data.openFeedback),
    featureSuggestion: normalizeOptional(data.featureSuggestion),
  });

  res.status(201).json({
    id: created._id.toString(),
    respondentType: created.respondentType,
    createdAt: created.createdAt.toISOString(),
    message: "Thank you for your feedback! You are helping us build a better internet for kids.",
  });
});

surveyRouter.get("/survey", async (_req, res) => {
  const rows = await SurveyResponse.find({}, null, { lean: true });

  const total = rows.length;
  const parentResponses = rows.filter((r) => r.respondentType === "parent").length;
  const kidResponses = rows.filter((r) => r.respondentType === "kid").length;
  const teacherResponses = rows.filter((r) => r.respondentType === "teacher").length;

  const averageInterestLevel =
    total > 0 ? rows.reduce((sum, r) => sum + r.interestLevel, 0) / total : 0;

  const wouldUseCount = rows.filter((r) => r.wouldUse).length;
  const wouldUsePercentage = total > 0 ? (wouldUseCount / total) * 100 : 0;

  res.json({
    totalResponses: total,
    parentResponses,
    kidResponses,
    teacherResponses,
    averageInterestLevel: Math.round(averageInterestLevel * 10) / 10,
    wouldUsePercentage: Math.round(wouldUsePercentage),
  });
});

export default surveyRouter;
