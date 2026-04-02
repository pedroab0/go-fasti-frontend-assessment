"use client"

import { useFormContext } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PostSkill } from "@/schemas/skill.editable"

interface SkillFormProps {
  isSubmitting?: boolean
}

export function SkillForm({ isSubmitting = false }: SkillFormProps) {
  const form = useFormContext<PostSkill>()
  const { errors } = form.formState

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <label htmlFor="name" className="text-sm font-medium">Name</label>
        <Input id="name" placeholder="e.g. JavaScript" {...form.register("name")} />
        {errors.name && <p className="text-destructive text-xs">{errors.name.message}</p>}
      </div>

      <div className="space-y-1">
        <label htmlFor="category" className="text-sm font-medium">Category</label>
        <Input id="category" placeholder="e.g. Programming" {...form.register("category")} />
        {errors.category && <p className="text-destructive text-xs">{errors.category.message}</p>}
      </div>

      <div className="space-y-1">
        <label htmlFor="level" className="text-sm font-medium">Level</label>
        <Input id="level" placeholder="e.g. advanced" {...form.register("level")} />
        {errors.level && <p className="text-destructive text-xs">{errors.level.message}</p>}
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting} className="bg-gf-blue hover:bg-gf-blue/90">
          Save
        </Button>
      </div>
    </div>
  )
}
