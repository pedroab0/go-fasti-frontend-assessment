import { useMutation, useQueryClient } from "@tanstack/react-query"

import { skillsApi } from "@/lib/api/skills"
import { queryKeys } from "@/lib/query-keys"

export function useDeleteSkill() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteSkill(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.skills.all })
    },
  })
}

async function deleteSkill(id: string): Promise<void> {
  await skillsApi.delete(`skills/${id}`)
}
