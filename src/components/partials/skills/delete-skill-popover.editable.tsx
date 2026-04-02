"use client"

import { useState } from "react"
import { Trash2 } from "lucide-react"

import { useDeleteSkill } from "@/hooks/api/delete/useDeleteSkill.editable"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DeleteSkillPopoverProps {
  id: string
}

export function DeleteSkillPopover({ id }: DeleteSkillPopoverProps) {
  const [open, setOpen] = useState(false)

  const { isPending: isDeleting, mutate: deleteSkill } = useDeleteSkill()

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
          <Trash2 size={16} />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-64 space-y-3">
        <p className="text-sm font-medium">Delete this skill?</p>
        <p className="text-muted-foreground text-xs">This action cannot be undone.</p>

        <div className="flex justify-end gap-2">
          <Button variant="outline" size="sm" onClick={() => setOpen(false)}>Cancel</Button>

          <Button
            variant="destructive"
            size="sm"
            disabled={isDeleting}
            onClick={() => deleteSkill(id, { onSuccess: () => setOpen(false) })}
          >
            Delete
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
