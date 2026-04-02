import { z } from "zod"

const personSchema = z.object({
  id: z.number(),
  first_name: z.string(),
  last_name: z.string(),
  name: z.string(),
  employee_id: z.string(),
})

export const applicationApiSchema = z.object({
  id: z.number(),
  candidate_id: z.number(),
  prospect: z.boolean(),
  applied_at: z.string(),
  rejected_at: z.string().nullable(),
  last_activity_at: z.string(),
  location: z.object({ address: z.string() }).nullable(),
  source: z.object({ id: z.number(), public_name: z.string() }),
  credited_to: personSchema.nullable(),
  recruiter: personSchema.nullable(),
  coordinator: personSchema.nullable(),
  rejection_reason: z.unknown().nullable(),
  rejection_details: z.unknown().nullable(),
  jobs: z.array(z.object({ id: z.number(), name: z.string() })),
  job_post_id: z.number().nullable(),
  status: z.string(),
  current_stage: z.object({ id: z.number(), name: z.string() }).nullable(),
  answers: z.array(z.object({ question: z.string(), answer: z.string() })),
  prospective_office: z.unknown().nullable(),
  prospective_department: z.unknown().nullable(),
  prospect_detail: z.object({
    prospect_pool: z.unknown().nullable(),
    prospect_stage: z.unknown().nullable(),
    prospect_owner: z.unknown().nullable(),
  }),
  custom_fields: z.record(z.string(), z.unknown()),
  keyed_custom_fields: z.record(z.string(), z.unknown()),
  attachments: z.array(z.object({
    filename: z.string(),
    url: z.string(),
    type: z.string(),
    created_at: z.string(),
  })),
})
export type ApplicationApi = z.infer<typeof applicationApiSchema>

// TODO: define what gets exposed to the frontend — only the fields needed to render the card
export const applicationSchema = z.object({
  id: z.number(),
  candidate_id: z.number(),
  prospect: z.boolean(),
  applied_at: z.string(),
  status: z.string(),
  jobs: z.array(z.object({ id: z.number(), name: z.string() })),
  location: z.object({ address: z.string() }).nullable(),
  current_stage: z.object({ id: z.number(), name: z.string() }).nullable(),
  source: z.object({ id: z.number(), public_name: z.string() }),
  credited_to: z.object({ name: z.string() }).nullable(),
})
export type Application = z.infer<typeof applicationSchema>

export function toApplication(api: ApplicationApi): Application {
  return {
    id: api.id,
    candidate_id: api.candidate_id,
    prospect: api.prospect,
    applied_at: api.applied_at,
    status: api.status,
    jobs: api.jobs,
    location: api.location,
    current_stage: api.current_stage,
    source: api.source,
    credited_to: api.credited_to ? { name: api.credited_to.name } : null,
  }
}
