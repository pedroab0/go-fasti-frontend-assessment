import { z } from "zod"

import { applicantsApi } from "@/lib/api/applicants"
import { ApplicationCard } from "@/components/partials/applications/application-card"
import { applicationApiSchema, toApplication } from "@/schemas/application.editable"

export default async function ApplicationsPage() {
  const data = await applicantsApi.get("applications").json()
  const parsed = z.array(applicationApiSchema).parse(data)
  const applications = parsed.map(toApplication)

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Applications</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {applications.map((application) => (
          <ApplicationCard key={application.id} application={application} />
        ))}
      </div>
    </div>
  )
}
