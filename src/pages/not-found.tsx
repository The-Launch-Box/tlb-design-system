import { Link } from "react-router";
import { Button } from "@/components/ui/button";

export function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center bg-background text-foreground">
      <div className="text-center">
        <p className="font-display text-6xl">404</p>
        <p className="mt-2 font-sans text-muted-foreground">That page is not on the board.</p>
        <Button asChild className="mt-6"><Link to="/">Back to board</Link></Button>
      </div>
    </div>
  );
}
