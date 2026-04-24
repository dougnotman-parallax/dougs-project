import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/aura/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/aura/dialog";
import type { CreateProjectInput } from "../constants/projects";

type CreateProjectDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (input: CreateProjectInput) => void;
};

export function CreateProjectDialog({ open, onOpenChange, onSubmit }: CreateProjectDialogProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [intendedOutcome, setIntendedOutcome] = useState("");

  const reset = () => {
    setName("");
    setDescription("");
    setIntendedOutcome("");
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) reset();
    onOpenChange(next);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedDesc = description.trim();
    const trimmedOutcome = intendedOutcome.trim();
    if (!trimmedName || !trimmedDesc || !trimmedOutcome) return;
    onSubmit({
      name: trimmedName,
      description: trimmedDesc,
      intendedOutcome: trimmedOutcome,
    });
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg" showCloseButton>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create project</DialogTitle>
            <DialogDescription>
              Describe the work and the outcome you want. You can add canvases, charts, and other
              context from the project details page.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 py-2">
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-foreground">Project name</span>
              <input
                required
                value={name}
                onChange={(ev) => setName(ev.target.value)}
                placeholder="e.g. Q1 production review"
                className="h-10 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-foreground">Project description</span>
              <textarea
                required
                value={description}
                onChange={(ev) => setDescription(ev.target.value)}
                placeholder="What is this project about?"
                rows={3}
                className="min-h-[80px] w-full resize-y rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-foreground">Intended outcome</span>
              <textarea
                required
                value={intendedOutcome}
                onChange={(ev) => setIntendedOutcome(ev.target.value)}
                placeholder="What deliverable or decision should this enable?"
                rows={3}
                className="min-h-[80px] w-full resize-y rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </label>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => handleOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create project</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
