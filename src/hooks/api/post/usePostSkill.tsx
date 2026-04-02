import { useMutation, useQueryClient } from "@tanstack/react-query"

import { skillsApi } from "@/lib/api/skills"
import { queryKeys } from "@/lib/query-keys"
import type { PostSkill } from "@/schemas/skill.editable"

export function usePostSkill() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (body: PostSkill) => postSkill(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.skills.all })
    },
  })
}

async function postSkill(body: PostSkill) {
  return skillsApi.post("skills", { json: body }).json()
}
