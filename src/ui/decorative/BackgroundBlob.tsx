type BackgroundBlobProps = {
  classes: string;
};

export default function BackgroundBlob({ classes }: BackgroundBlobProps) {
  return (
    <div
      className={`absolute h-9 w-9 rounded-full bg-gradient-to-br from-white/80 to-white/0 blur-lg ${classes}`}
    />
  );
}
