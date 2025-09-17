"use client";

import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { Loader, Trash } from "lucide-react";

type DeleteDialogProps = {
  id: string;
  action: (id: string) => Promise<{ success: boolean; message?: string }>;
  texts?: {
    heading: string;
    description: string;
  };
};

const DEFAULT_TEXTS = {
  heading: "Are you sure you want to delete this item?",
  description:
    "This action cannot be undone. This will permanently delete the selected item and remove its data.",
};

const DeleteDialog = ({
  id,
  action,
  texts = DEFAULT_TEXTS,
}: DeleteDialogProps) => {
  const [isPending, startTransition] = useTransition();

  const handleAction = async () => {
    startTransition(async () => {
      const result = await action(id);
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {texts?.heading || DEFAULT_TEXTS.heading}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {texts?.description || DEFAULT_TEXTS.description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            disabled={isPending}
            onClick={handleAction}
          >
            {isPending ? (
              <>
                <Loader className="animate-spin" /> Deleting
              </>
            ) : (
              <>
                <Trash /> Continue
              </>
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
