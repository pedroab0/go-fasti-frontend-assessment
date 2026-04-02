import type { Application } from "@/schemas/application.editable"

export function ApplicationCard({ application }: { application: Application }) {
  const appliedDate = new Date(application.applied_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  return (
    <div className="rounded-lg border p-4 space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-semibold">
            {application.jobs.map((j) => j.name).join(", ") || "No job title"}
          </p>
          <p className="text-muted-foreground text-sm">
            Candidate #{application.candidate_id}
          </p>
        </div>
        <span className="text-xs font-medium rounded-full px-2.5 py-0.5 bg-primary/10 text-primary capitalize">
          {application.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm">
        {application.location && (
          <div>
            <p className="text-muted-foreground text-xs">Location</p>
            <p>{application.location.address}</p>
          </div>
        )}

        {application.current_stage && (
          <div>
            <p className="text-muted-foreground text-xs">Stage</p>
            <p>{application.current_stage.name}</p>
          </div>
        )}

        <div>
          <p className="text-muted-foreground text-xs">Source</p>
          <p>{application.source.public_name}</p>
        </div>

        {application.credited_to && (
          <div>
            <p className="text-muted-foreground text-xs">Credited to</p>
            <p>{application.credited_to.name}</p>
          </div>
        )}

        <div>
          <p className="text-muted-foreground text-xs">Applied</p>
          <p>{appliedDate}</p>
        </div>

        <div>
          <p className="text-muted-foreground text-xs">Type</p>
          <p>{application.prospect ? "Prospect" : "Applicant"}</p>
        </div>
      </div>
    </div>
  )
}
