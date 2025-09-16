import { FieldValues, Control, Path } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "../form";
import { Card, CardContent } from "../card";
import { toast } from "sonner";
import Image from "next/image";
import { UploadButton } from "@/components/widgets/upload-button/UploadButton";

type FormImageUploadProps<T extends FieldValues, K extends Path<T>> = {
  label: string;
  control: Control<T>;
  name: K;
  fieldDescription?: string;
  images: string[];
  handleImageUpload: (urls: string[]) => void;
};

const FormImageUpload = <T extends FieldValues, K extends Path<T>>({
  label,
  control,
  name,
  fieldDescription,
  images,
  handleImageUpload,
}: FormImageUploadProps<T, K>) => {
  return (
    <div className="flex flex-col md:flex-row gap-5 w-full">
      <FormField
        control={control}
        name={name}
        render={() => (
          <FormItem className="w-full">
            <FormLabel>{label}</FormLabel>
            <Card>
              <CardContent className="space-y-2 mt-2 min-h-48">
                <div className="flex-start space-x-2">
                  {(images ?? []).map(
                    (img, index) =>
                      img && (
                        <Image
                          key={index}
                          src={img}
                          alt={`Uploaded ${index + 1}`}
                          className="w-24 h-24 object-cover object-center rounded-sm"
                          width={96}
                          height={96}
                        />
                      )
                  )}
                </div>
              </CardContent>
            </Card>
            <FormControl>
              <UploadButton
                className="mt-4 ut-button:bg-slate-950"
                endpoint="imageUploader"
                onClientUploadComplete={(res: { url: string }[]) => {
                  handleImageUpload(res.map((file) => file.url));
                }}
                onUploadError={(error: Error) => {
                  toast.error(`Failed to upload image: ${error.message}`);
                }}
              />
            </FormControl>
            {fieldDescription && (
              <FormDescription>{fieldDescription}</FormDescription>
            )}
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
export default FormImageUpload;
