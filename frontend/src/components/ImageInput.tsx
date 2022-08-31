import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

interface IImageInputProps {
  displayImage: string;
  className?: string;
  cb: (fileData: any) => void;
}

export const ImageInput = (props: IImageInputProps) => {
  const [imageSrc, setImageSrc] = useState(props.displayImage);
  const [uploadError, setUploadError] = useState<boolean>(false);

  const uploadHandler = (ev: any) => {
    const reader = new FileReader();

    const file = ev.target.files[0];
    reader.readAsDataURL(file);

    if (file.size > 1048576) {
      setUploadError(true);
      return;
    }
    setUploadError(false);

    reader.onload = () => {
      setImageSrc(reader.result as string);
      return props.cb(reader.result);
    };
  };

  return (
    <div className="relative group">
      <img
        src={imageSrc}
        className={twMerge(
          "w-56 rounded-full object-cover aspect-square",
          props.className,
          uploadError ? "border-2 border-danger-500" : ""
        )}
        alt=""
      />
      <div className="w-12 h-12 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid justify-items-center items-center bg-primary-900/70 group-hover:w-full group-hover:h-full">
        <Icon
          className="w-7 h-7 text-white"
          icon="icon-park-outline:add-picture"
        />
        <input
          type="file"
          accept=".jpg"
          className="absolute w-full h-full opacity-0"
          onChange={uploadHandler}
        />
      </div>
      {uploadError && (
        <div className="p-2 text-center text-xs font-light text-danger-500">
          La imagen debe pesar menos de 10mb.
        </div>
      )}
    </div>
  );
};
