import { useMutation, useQueryClient } from "@tanstack/react-query"

import { skillsApi } from "@/lib/api/skills"
import { queryKeys } from "@/lib/query-keys"

import type { PutSkill } from "@/schemas/skill.editable"

export function usePutSkill() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: { id: string } & PutSkill) => putSkill(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.skills.all })
    },
  })
}

async function putSkill({ id, ...body }: { id: string } & PutSkill) {
  return skillsApi.put(`skills/${id}`, { json: body }).json()
}
