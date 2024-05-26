import { LearningResource } from "src/types/resources";

type ListItemProps = {
  resource: LearningResource;
};

export default function ListItem({
  resource: { id, text, imagePath, alt, imagePath2, alt2 },
}: ListItemProps) {
  return (
    <li className="flex flex-col items-start gap-6">
      <div className="flex items-center gap-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-full border-2">
          <span>{id}</span>
        </span>
        <p>{text}</p>
      </div>
      <div className="relative self-center">
        <img src={imagePath} alt={alt} className="h-full max-h-48" />
        {imagePath2 && alt2 && (
          <img
            src={imagePath2}
            alt={alt2}
            className="absolute bottom-0 right-0 w-20 translate-x-1/2 translate-y-1/2"
          />
        )}
      </div>
    </li>
  );
}
