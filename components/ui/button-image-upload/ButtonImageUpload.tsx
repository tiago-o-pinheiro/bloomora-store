"use client";

import { UploadButton } from "@/components/widgets/upload-button/UploadButton";
import { toast } from "sonner";

type Props = {
  onComplete: (url: string) => void;
  className?: string;
};

const ButtonImageUpload = ({ onComplete, className = "" }: Props) => {
  return (
    <UploadButton
      endpoint="imageUploader"
      onClientUploadComplete={(files) => {
        const url = files?.[0]?.url;
        if (url) onComplete(url);
      }}
      onUploadError={(e: Error) => {
        toast.error("Upload failed: " + e.message);
      }}
      className={[
        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium",
        "transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        "disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2",
        "bg-primary text-primary-foreground hover:bg-primary/90",
        "ut-button:bg-transparent ut-button:text-inherit ut-button:hover:bg-transparent",
        "ut-uploading:opacity-70",
        "ut-label:font-medium",
        "ut-progress:h-1 ut-progress:w-full",
        "ut-allowed-content:text-muted-foreground ut-allowed-content:text-xs",
        className,
      ].join(" ")}
    />
  );
};

export default ButtonImageUpload;
