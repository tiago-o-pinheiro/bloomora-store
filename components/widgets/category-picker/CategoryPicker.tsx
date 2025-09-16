"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

type CategoryOption = { id: string; name: string };

type CategoryPickerProps = {
  categories: CategoryOption[];
  value?: string[];
  onChange: (next: CategoryOption[]) => void;
  triggerLabel?: string;
  title?: string;
  description?: string;
};

export const CategoryPicker = ({
  categories,
  value = [],
  onChange,
  triggerLabel,
  title = "Select categories",
  description = "Choose one or more categories for this product.",
}: CategoryPickerProps) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(value ?? []);

  const resetFromValue = () => setSelectedIds(value ?? []);

  const toggle = (id: string, checked: boolean) =>
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return Array.from(next);
    });

  const handleSave = () => {
    onChange(
      categories
        .filter((c) => selectedIds.includes(c.id))
        .map(({ id, name }) => ({ id, name }))
    );
  };

  const handleCancel = () => resetFromValue();

  const triggerText =
    triggerLabel ??
    (value.length ? `${value.length} selected` : "Choose categories");

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" onClick={resetFromValue}>
          {triggerText}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="sm:max-w-[480px]">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        <div className="max-h-[300px] overflow-y-auto space-y-2 pr-2">
          {categories.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No categories found.
            </p>
          ) : (
            categories.map((cat) => {
              const checkboxId = `cat-${cat.id}`;
              return (
                <label
                  key={cat.id}
                  htmlFor={checkboxId}
                  className="flex items-center gap-2"
                >
                  <Checkbox
                    id={checkboxId}
                    checked={selectedIds.includes(cat.id)}
                    onCheckedChange={(state) => toggle(cat.id, state === true)}
                  />
                  <span className="text-sm">{cat.name}</span>
                </label>
              );
            })
          )}
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleSave}>Save</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
