import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export default function FinalCTA() {
  return (
    <section className="py-24 border-t border-border relative overflow-hidden">
      <div className="absolute inset-0 bg-radial-glow-strong" />
      <div className="container relative z-10 text-center max-w-2xl mx-auto">
        <h2 className="font-heading text-4xl sm:text-5xl font-extrabold mb-4 text-balance">
          Your portfolio starts today.
        </h2>
        <p className="text-lg text-muted-foreground mb-10">
          Stop bookmarking tutorials. Start shipping.
        </p>
        <div className="flex items-center justify-center gap-4">
          <HoverBorderGradient
            as={Link}
            to="/signup"
            containerClassName="rounded-lg"
            className="inline-flex items-center gap-2 font-semibold text-foreground"
          >
            Pick Your Track <ArrowRight size={16} />
          </HoverBorderGradient>
          <HoverBorderGradient
            as="a"
            containerClassName="rounded-lg"
            className="inline-flex items-center gap-2 text-sm text-foreground"
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            See What Others Built
          </HoverBorderGradient>
        </div>
      </div>
    </section>
  );
}
