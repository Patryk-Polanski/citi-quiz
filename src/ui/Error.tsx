import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import BackgroundBlob from "./decorative/BackgroundBlob";
import Button from "./Button";
import Icon from "./Icons/Icon";
import { IconNames } from "../types/enums";

type ErrorProps = {
  errorMessage?: string;
};

export default function Error({ errorMessage }: ErrorProps) {
  const error = useRouteError();
  console.error("💥 ~ Error ~ error:", error);

  return (
    <div className=" bg-sky-600  font-comfortaa text-white">
      <div className="flex min-h-dvh flex-col items-center justify-center gap-3 bg-gradient-to-br from-white/50 to-white/20">
        {isRouteErrorResponse(error) ? (
          <>
            <h1 className="h2">404: Page not found</h1>
            <small>{error.data}</small>
          </>
        ) : (
          <>
            <h1 className="h2">404: Could not find the requested data</h1>
            <small>
              {errorMessage ? errorMessage : "Something went wrong..."}
            </small>
          </>
        )}
        <div className="mt-8">
          <Button el="link" href="/">
            <Icon
              iconName={IconNames.Chevron}
              className="h-[18px] w-[18px] rotate-180"
            />
            <span className="w-[2px] self-stretch bg-white opacity-60" />
            <span>Back Home</span>
          </Button>
        </div>
        <BackgroundBlob classes="top-[200px] right-[200px] h-8 w-8" />
        <BackgroundBlob classes="top-[180px] left-[200px]" />
        <BackgroundBlob classes="bottom-[180px] right-[200px]" />
        <BackgroundBlob classes="bottom-[200px] left-[200px] h-8 w-8" />
      </div>
    </div>
  );
}
