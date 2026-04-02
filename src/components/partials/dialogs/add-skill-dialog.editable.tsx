"use client"

import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus } from "lucide-react"

import { usePostSkill } from "@/hooks/api/post/usePostSkill"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { SkillForm } from "@/components/partials/forms/skill-form.editable"

import { skillInputSchema, type PostSkill } from "@/schemas/skill.editable"

export function AddSkillDialog() {
  const [open, setOpen] = useState(false)

  const form = useForm<PostSkill>({
    resolver: zodResolver(skillInputSchema),
    defaultValues: { name: "", category: "", level: "" },
  })

  const { handleSubmit } = form

  const { mutate: createSkill, isPending } = usePostSkill()

  const onSubmit = (data: PostSkill) => {
    createSkill(data, {
      onSuccess: () => {
        setOpen(false)
        form.reset()
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gf-blue hover:bg-gf-blue/90">
          <Plus />
          Add skill
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add skill</DialogTitle>
        </DialogHeader>
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <SkillForm isSubmitting={isPending} />
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}
