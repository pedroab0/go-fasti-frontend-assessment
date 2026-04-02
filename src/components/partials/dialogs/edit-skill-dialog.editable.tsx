"use client"

import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Pencil } from "lucide-react"

import { usePutSkill } from "@/hooks/api/put/usePutSkill"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { SkillForm } from "@/components/partials/forms/skill-form.editable"

import { skillInputSchema, type PutSkill, type Skill } from "@/schemas/skill.editable"

interface EditSkillDialogProps {
  skill: Skill
}

export function EditSkillDialog({ skill }: EditSkillDialogProps) {
  const [open, setOpen] = useState(false)

  const form = useForm<PutSkill>({
    resolver: zodResolver(skillInputSchema),
    defaultValues: { name: skill.name, category: skill.category, level: skill.level },
  })

  const { handleSubmit } = form

  const { mutate: putSkill, isPending: isUpdating } = usePutSkill()

  const onSubmit = (data: PutSkill) => {
    putSkill({ id: skill.id, ...data }, {
      onSuccess: () => {
        setOpen(false)
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Pencil size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit skill</DialogTitle>
        </DialogHeader>
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <SkillForm isSubmitting={isUpdating} />
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}
