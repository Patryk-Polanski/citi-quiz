import Button from "src/ui/Button";
import Icon from "src/ui/Icons/Icon";
import { IconNames } from "src/types/enums";
import { useCallback, useEffect, useState } from "react";

enum AccountWindows {
  Login = "login",
  Register = "register",
  User = "user",
}

type AccountProps = {
  onClose: () => void;
};

export default function Account({ onClose }: AccountProps) {
  const [windowState, setWindowState] = useState<AccountWindows>(
    AccountWindows.Login,
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleClose = useCallback(
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const target = e.target as HTMLElement;
      if (!target.closest("#accountModal")) onClose();
    },
    [onClose],
  );

  return (
    <div
      onClick={handleClose}
      className="fixed inset-0 z-40 flex items-center justify-center bg-white/50"
    >
      <div
        id="accountModal"
        className="min-h-60 min-w-96 overflow-hidden rounded-3xl border-2 bg-sky-700 text-white"
      >
        <div className="min-h-60 min-w-96 bg-gradient-to-br from-white/60 to-white/30 p-5 font-medium">
          <Button
            el="button"
            onClick={onClose}
            omitStyles
            classes="ml-auto block"
          >
            <Icon iconName={IconNames.Close} className="h-6 w-6" />
          </Button>
          <div className="text-center">
            <h5 className="mt-2 text-center">
              Log in to save your quizzes data
            </h5>
            <p>Need an account? Register here</p>
          </div>
        </div>
      </div>
    </div>
  );
}
