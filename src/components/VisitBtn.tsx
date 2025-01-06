import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";

function VisitBtn({ shareUrl }: { shareUrl: string }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const shareLink = `${window.location.origin}/submit/${shareUrl}`;
  return (
    <Button
      className="w-[200px] bg-indigo-500 hover:bg-indigo-600"
      onClick={() => {
        window.open(shareLink, "_blank");
      }}
    >
      Visit
    </Button>
  );
}

export default VisitBtn;
