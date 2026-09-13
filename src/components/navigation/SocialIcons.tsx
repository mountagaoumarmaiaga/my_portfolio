"use client";

import { site, socialLinks } from "@/data/site";
import { ResumeIcon, socialIcons } from "@/components/ui/Icons";
import { useCopy } from "@/hooks/useCopy";

interface SocialIconsProps {
  className?: string;
  /** Adds the platform name beside the mark — used in the mobile sheet. */
  withLabels?: boolean;
  /** Slightly tighter targets, for the header where room is scarce. */
  compact?: boolean;
  /** Appends the résumé, so the header carries one group instead of two. */
  withResume?: boolean;
}

/**
 * The social links as marks. Each one is a 36px target with its own label, and
 * the mark itself is hidden from assistive tech so nothing is announced twice.
 */
export default function SocialIcons({
  className,
  withLabels = false,
  compact = false,
  withResume = false,
}: SocialIconsProps) {
  const { lang, c } = useCopy();

  return (
    <ul className={`flex items-center ${withLabels ? "flex-col items-stretch gap-1" : "gap-0.5"} ${className ?? ""}`}>
      {socialLinks.map((link) => {
        const Icon = socialIcons[link.id];

        return (
          <li key={link.id}>
            <a
              href={link.href}
              aria-label={link.a11yLabel[lang]}
              {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className={`group flex items-center rounded-sm text-ink-muted transition-colors duration-300 hover:bg-white/[0.06] hover:text-ink ${
                withLabels ? "gap-3 px-2 py-2.5" : compact ? "h-8 w-8 justify-center" : "h-9 w-9 justify-center"
              }`}
            >
              <Icon className="h-[17px] w-[17px] shrink-0" />
              {withLabels && <span className="text-[14px]">{link.label}</span>}
            </a>
          </li>
        );
      })}

      {withResume && (
        <li>
          <a
            href={site.cv}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={c.nav.resume}
            className={`group flex items-center rounded-sm text-ink-muted transition-colors duration-300 hover:bg-white/[0.06] hover:text-ink ${
              withLabels ? "gap-3 px-2 py-2.5" : compact ? "h-8 w-8 justify-center" : "h-9 w-9 justify-center"
            }`}
          >
            <ResumeIcon className="h-[17px] w-[17px] shrink-0" />
            {withLabels && <span className="text-[14px]">{c.nav.resume}</span>}
          </a>
        </li>
      )}
    </ul>
  );
}
