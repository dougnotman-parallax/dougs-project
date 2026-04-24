import {
  IconDotsVertical,
  IconHistory,
  IconLayoutSidebarRightCollapse,
  IconLayoutSidebarRightExpand,
  IconMapPin,
  IconMessagePlus,
  IconX,
} from "@tabler/icons-react";
import { useState, useRef, useEffect } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/aura/breadcrumb";
import { Button, buttonVariants } from "@/components/ui/aura/button";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "./ui/tooltip";

/** Stacks above chat chrome; surface matches app tooltip (dark fill, light text). */
const chatTopBarTooltipClass =
  "z-[200] border-0 bg-[#191b1d] px-2.5 py-1.5 text-xs font-sans font-normal text-[#f1f2f3] shadow-md";

/** Aura ghost icon buttons; active dock/history use primary wash from theme */
const chatTopBarIconButtonClass = "size-9 shrink-0 rounded-md";
const chatTopBarAccentIconClass = "bg-primary/10 hover:bg-primary/15 dark:hover:bg-primary/15";

interface AgentNameProps {
  isSidePanel?: boolean;
  basePageTitle?: string;
  chatTitle?: string;
  onBreadcrumbBaseClick?: () => void;
}

function AgentName({
  isSidePanel = true,
  basePageTitle = "Dashboard",
  chatTitle = "Chat",
  onBreadcrumbBaseClick,
}: AgentNameProps) {
  const showBreadcrumb = !isSidePanel && Boolean(basePageTitle);

  return (
    <div className="content-stretch flex min-w-0 flex-1 gap-[8px] items-center justify-start overflow-hidden" data-name="Agent name">
      <div className="relative shrink-0 size-[16px]" data-name="Atlas AI logo">
        <div className="absolute bg-primary inset-[0_36%_64%_0] opacity-90 rounded-br-[16px] rounded-tl-[16px]" />
        <div className="absolute flex inset-[64%_0_0_36%] items-center justify-center">
          <div className="flex-none h-[5.76px] rotate-180 w-[10.24px]">
            <div className="bg-primary opacity-90 rounded-br-[16px] rounded-tl-[16px] size-full" />
          </div>
        </div>
        <div className="absolute flex inset-[0_0_36%_64%] items-center justify-center">
          <div className="-rotate-90 flex-none h-[5.76px] w-[10.24px]">
            <div className="bg-secondary rounded-br-[16px] rounded-tl-[16px] size-full" />
          </div>
        </div>
        <div className="absolute flex inset-[36%_64%_0_0] items-center justify-center">
          <div className="-rotate-90 flex-none h-[5.76px] w-[10.24px]">
            <div className="bg-secondary rounded-br-[16px] rounded-tl-[16px] size-full" />
          </div>
        </div>
      </div>
      {showBreadcrumb ? (
        <Breadcrumb
          className="flex min-h-px min-w-0 flex-[1_0_0] items-center font-sans text-base font-semibold leading-5 tracking-tight text-foreground"
          style={{ fontFeatureSettings: "'cv05'" }}
        >
          <BreadcrumbList className="min-w-0 flex-wrap items-center gap-x-1 gap-y-0.5">
            <BreadcrumbItem className="shrink-0 text-foreground">
              <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={onBreadcrumbBaseClick}
                    aria-label={`Dock chat to side — ${basePageTitle}`}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "sm" }),
                      "h-auto max-w-[min(100%,24rem)] truncate px-0.5 py-0 font-semibold text-foreground hover:bg-accent hover:underline hover:underline-offset-2",
                    )}
                  >
                    {basePageTitle}
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom" sideOffset={6} className={chatTopBarTooltipClass}>
                  Dock chat to side
                </TooltipContent>
              </Tooltip>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="shrink-0 text-muted-foreground [&>svg]:size-3.5" />
            <BreadcrumbItem className="min-w-0 flex-1 basis-0 text-foreground">
              <BreadcrumbPage className="h-auto min-w-0 max-w-full cursor-default truncate px-0.5 py-0 font-semibold text-foreground hover:bg-transparent dark:hover:bg-transparent">
                {chatTitle}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      ) : (
        <p
          className="min-w-0 flex-1 truncate overflow-hidden font-sans text-base font-semibold leading-[1.5] tracking-tight text-foreground"
          style={{ fontFeatureSettings: "'cv05'" }}
          title={chatTitle}
        >
          {chatTitle}
        </p>
      )}
    </div>
  );
}

interface HeadingProps {
  isSidePanel?: boolean;
  basePageTitle?: string;
  chatTitle?: string;
  onBreadcrumbBaseClick?: () => void;
}

function Heading({ isSidePanel, basePageTitle, chatTitle, onBreadcrumbBaseClick }: HeadingProps) {
  return (
    <div className="content-stretch flex min-h-px min-w-0 flex-1 flex-col gap-[8px] items-start overflow-hidden" data-name="Heading">
      <AgentName
        isSidePanel={isSidePanel}
        basePageTitle={basePageTitle}
        chatTitle={chatTitle}
        onBreadcrumbBaseClick={onBreadcrumbBaseClick}
      />
    </div>
  );
}

interface FrameProps {
  onHistoryClick?: () => void;
  isHistoryOpen?: boolean;
  onNewChat?: () => void;
}

function Frame({ onHistoryClick, isHistoryOpen, onNewChat }: FrameProps) {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={onNewChat}
            className={chatTopBarIconButtonClass}
            data-name="Button 4"
            aria-label="New chat"
          >
            <IconMessagePlus className="size-4 text-muted-foreground" aria-hidden />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" sideOffset={6} className={chatTopBarTooltipClass}>
          New chat
        </TooltipContent>
      </Tooltip>
      <div className="content-stretch flex items-start relative shrink-0" data-name="More actions button">
        <Tooltip delayDuration={200}>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={onHistoryClick}
              className={cn(chatTopBarIconButtonClass, isHistoryOpen && chatTopBarAccentIconClass)}
              data-name="⭐️ 𝗜𝗖𝗢𝗡 𝗢𝗡𝗟𝗬 𝗕𝗨𝗧𝗧𝗢𝗡"
              aria-label="Conversation history"
            >
              <IconHistory
                className={cn("size-4", isHistoryOpen ? "text-primary" : "text-muted-foreground")}
                aria-hidden
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom" sideOffset={6} className={chatTopBarTooltipClass}>
            Conversation history
          </TooltipContent>
        </Tooltip>
      </div>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={chatTopBarIconButtonClass}
            data-name="Location button"
            aria-label="Location"
          >
            <IconMapPin className="size-4 text-muted-foreground" aria-hidden />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" sideOffset={6} className={chatTopBarTooltipClass}>
          Location
        </TooltipContent>
      </Tooltip>
    </div>
  );
}

/** Full screen → collapse to right sidebar (dock); side panel → expand to full screen */
function ExpandCollapseIcon({ isFullScreen }: { isFullScreen: boolean }) {
  return (
    <div className="relative flex size-4 shrink-0 items-center justify-center" data-name="Icon Only">
      <span
        className={`absolute inset-0 flex items-center justify-center transition-all duration-200 ease-out ${
          isFullScreen ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"
        }`}
        aria-hidden={!isFullScreen}
        data-name="Collapse"
      >
        <IconLayoutSidebarRightCollapse className="size-4 text-primary" stroke={2} aria-hidden />
      </span>
      <span
        className={`absolute inset-0 flex items-center justify-center transition-all duration-200 ease-out ${
          isFullScreen ? "opacity-0 scale-75 pointer-events-none" : "opacity-100 scale-100"
        }`}
        aria-hidden={isFullScreen}
        data-name="Expand"
      >
        <IconLayoutSidebarRightExpand className="size-4 text-muted-foreground" stroke={2} aria-hidden />
      </span>
    </div>
  );
}

interface ButtonGroupProps {
  onToggleExpand?: () => void;
  isExpanded?: boolean;
  onClose?: () => void;
  isSidePanel?: boolean;
  onHistoryClick?: () => void;
  isHistoryOpen?: boolean;
  onNewChat?: () => void;
  /** Current app page label for full-screen breadcrumb (e.g. Dashboard, Search) */
  basePageTitle?: string;
  chatTitle?: string;
  onBreadcrumbBaseClick?: () => void;
}

function ButtonGroup({ onToggleExpand, isExpanded = true, onClose, isSidePanel, onHistoryClick, isHistoryOpen, onNewChat }: ButtonGroupProps) {
  const dockTooltip = isExpanded ? "Dock chat to side" : "Expand chat to full screen";

  return (
    <div className="content-stretch flex gap-[34px] items-start justify-end relative shrink-0" data-name="Button group">
      {!isSidePanel && <Frame onHistoryClick={onHistoryClick} isHistoryOpen={isHistoryOpen} onNewChat={onNewChat} />}
      {isExpanded ? (
        <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
          <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={onToggleExpand}
                className={cn(chatTopBarIconButtonClass, chatTopBarAccentIconClass)}
                data-name="Button 1"
                aria-label={dockTooltip}
              >
                <ExpandCollapseIcon isFullScreen={isExpanded} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" sideOffset={6} className={chatTopBarTooltipClass}>
              {dockTooltip}
            </TooltipContent>
          </Tooltip>
          <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={onClose}
                className={chatTopBarIconButtonClass}
                data-name="Close button"
                aria-label="Close chat"
              >
                <IconX className="size-4 text-muted-foreground" stroke={2} aria-hidden />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" sideOffset={6} className={chatTopBarTooltipClass}>
              Close chat
            </TooltipContent>
          </Tooltip>
        </div>
      ) : (
        <div className="content-stretch flex gap-[4px] items-center relative shrink-0">
          <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={onToggleExpand}
                className={chatTopBarIconButtonClass}
                data-name="Button 1"
                aria-label={dockTooltip}
              >
                <ExpandCollapseIcon isFullScreen={isExpanded} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" sideOffset={6} className={chatTopBarTooltipClass}>
              {dockTooltip}
            </TooltipContent>
          </Tooltip>
          <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={onClose}
                className={chatTopBarIconButtonClass}
                data-name="Close button"
                aria-label="Close chat"
              >
                <IconX className="size-4 text-muted-foreground" stroke={2} aria-hidden />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" sideOffset={6} className={chatTopBarTooltipClass}>
              Close chat
            </TooltipContent>
          </Tooltip>
        </div>
      )}
    </div>
  );
}

function Buttons({ onToggleExpand, isExpanded, onClose, isSidePanel, onHistoryClick, isHistoryOpen, onNewChat }: ButtonGroupProps) {
  return (
    <div className="content-stretch flex h-full min-w-0 items-start justify-end" data-name="Buttons">
      <ButtonGroup onToggleExpand={onToggleExpand} isExpanded={isExpanded} onClose={onClose} isSidePanel={isSidePanel} onHistoryClick={onHistoryClick} isHistoryOpen={isHistoryOpen} onNewChat={onNewChat} />
    </div>
  );
}

function TopSection({
  onToggleExpand,
  isExpanded,
  onClose,
  isSidePanel,
  onHistoryClick,
  isHistoryOpen,
  onNewChat,
  basePageTitle,
  chatTitle,
  onBreadcrumbBaseClick,
}: ButtonGroupProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isMenuOpen]);

  const handleNewConversationClick = () => {
    setIsMenuOpen(false);
    onNewChat?.();
  };

  const handleConversationHistoryClick = () => {
    setIsMenuOpen(false);
    if (onHistoryClick) {
      onHistoryClick();
    }
  };

  return (
    <div className="content-stretch flex min-w-0 gap-[8px] items-center relative shrink-0 w-full" data-name="Top section">
      {isSidePanel && (
        <div className="relative" ref={menuRef}>
          <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={chatTopBarIconButtonClass}
                data-name="More menu button"
                aria-label="More options"
                aria-expanded={isMenuOpen}
              >
                <IconDotsVertical className="size-4 text-muted-foreground" stroke={2} aria-hidden />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" sideOffset={6} className={chatTopBarTooltipClass}>
              More options
            </TooltipContent>
          </Tooltip>

          {isMenuOpen && (
            <div
              className="absolute left-0 top-[42px] z-50 flex w-[235px] flex-col gap-0.5 rounded-lg border border-border bg-popover p-1 shadow-md"
              role="menu"
            >
              <Button
                type="button"
                variant="ghost"
                role="menuitem"
                className="h-9 w-full justify-start gap-2 px-2 font-normal text-foreground"
                onClick={handleNewConversationClick}
              >
                <IconMessagePlus className="size-4 shrink-0 text-muted-foreground" stroke={2} aria-hidden />
                <span className="truncate text-left text-base tracking-tight">New conversation</span>
              </Button>
              <Button
                type="button"
                variant="ghost"
                role="menuitem"
                className="h-9 w-full justify-start gap-2 px-2 font-normal text-foreground"
                onClick={handleConversationHistoryClick}
              >
                <IconHistory className="size-4 shrink-0 text-muted-foreground" stroke={2} aria-hidden />
                <span className="truncate text-left text-base tracking-tight">Conversation History</span>
              </Button>
              <Button type="button" variant="ghost" role="menuitem" className="h-9 w-full justify-start gap-2 px-2 font-normal text-foreground">
                <IconMapPin className="size-4 shrink-0 text-muted-foreground" stroke={2} aria-hidden />
                <span className="truncate text-left text-base tracking-tight">Location</span>
              </Button>
            </div>
          )}
        </div>
      )}
      <Heading
        isSidePanel={isSidePanel}
        basePageTitle={basePageTitle}
        chatTitle={chatTitle}
        onBreadcrumbBaseClick={onBreadcrumbBaseClick}
      />
      <div className="flex shrink-0 flex-row items-center self-stretch">
        <Buttons onToggleExpand={onToggleExpand} isExpanded={isExpanded} onClose={onClose} isSidePanel={isSidePanel} onHistoryClick={onHistoryClick} isHistoryOpen={isHistoryOpen} onNewChat={onNewChat} />
      </div>
    </div>
  );
}

export function ChatTopBar({
  onToggleExpand,
  isExpanded = true,
  onClose,
  isSidePanel,
  onHistoryClick,
  isHistoryOpen,
  onNewChat,
  basePageTitle,
  chatTitle = "Chat",
  onBreadcrumbBaseClick,
}: ButtonGroupProps) {
  return (
    <div className="relative w-full shrink-0 bg-background" data-name="Contents">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 border-b border-border" />
      <div className="content-stretch flex flex-col items-start px-[20px] py-[12px] relative w-full">
        <TopSection
          onToggleExpand={onToggleExpand}
          isExpanded={isExpanded}
          onClose={onClose}
          isSidePanel={isSidePanel}
          onHistoryClick={onHistoryClick}
          isHistoryOpen={isHistoryOpen}
          onNewChat={onNewChat}
          basePageTitle={basePageTitle}
          chatTitle={chatTitle}
          onBreadcrumbBaseClick={onBreadcrumbBaseClick}
        />
      </div>
    </div>
  );
}