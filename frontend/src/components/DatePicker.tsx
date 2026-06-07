import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { formatDate } from "../utils/labels";

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  min?: string;
}

interface PopoverPosition {
  top: number;
  left: number;
  width: number;
  placement: "below" | "above";
}

const WEEKDAYS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const MONTHS = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];
const POPOVER_HEIGHT = 320;

function toIsoDate(year: number, month: number, day: number): string {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function parseIsoDate(value: string): Date | null {
  if (!value) return null;
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
}

function formatDisplay(value: string): string {
  if (!value) return "Selecionar data";
  return formatDate(value);
}

function buildCalendarDays(year: number, month: number): (number | null)[] {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: (number | null)[] = Array(firstDay).fill(null);

  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  return days;
}

function getPopoverPosition(trigger: HTMLButtonElement): PopoverPosition {
  const rect = trigger.getBoundingClientRect();
  const spaceBelow = window.innerHeight - rect.bottom;
  const placement = spaceBelow < POPOVER_HEIGHT && rect.top > POPOVER_HEIGHT ? "above" : "below";

  return {
    top: placement === "below" ? rect.bottom + 8 : rect.top - 8,
    left: rect.left,
    width: Math.max(rect.width, 280),
    placement,
  };
}

export function DatePicker({ value, onChange, label = "Vencimento", min }: DatePickerProps) {
  const id = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const selected = parseIsoDate(value);
  const today = new Date();

  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<PopoverPosition | null>(null);
  const [viewYear, setViewYear] = useState(selected?.getFullYear() ?? today.getFullYear());
  const [viewMonth, setViewMonth] = useState(selected?.getMonth() ?? today.getMonth());

  useEffect(() => {
    if (selected) {
      setViewYear(selected.getFullYear());
      setViewMonth(selected.getMonth());
    }
  }, [value]);

  useEffect(() => {
    if (!open || !triggerRef.current) return;

    function updatePosition() {
      if (triggerRef.current) {
        setPosition(getPopoverPosition(triggerRef.current));
      }
    }

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (
        containerRef.current?.contains(target) ||
        popoverRef.current?.contains(target)
      ) {
        return;
      }
      setOpen(false);
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  function selectDay(day: number) {
    const iso = toIsoDate(viewYear, viewMonth, day);
    if (min && iso < min) return;
    onChange(iso);
    setOpen(false);
  }

  function goToPreviousMonth() {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
      return;
    }
    setViewMonth((m) => m - 1);
  }

  function goToNextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
      return;
    }
    setViewMonth((m) => m + 1);
  }

  const calendarDays = buildCalendarDays(viewYear, viewMonth);
  const minDate = min ? parseIsoDate(min) : null;

  function isDisabled(day: number): boolean {
    if (!minDate) return false;
    const candidate = new Date(viewYear, viewMonth, day);
    return candidate < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate());
  }

  function isSelected(day: number): boolean {
    return (
      selected?.getFullYear() === viewYear &&
      selected?.getMonth() === viewMonth &&
      selected?.getDate() === day
    );
  }

  function isToday(day: number): boolean {
    return (
      today.getFullYear() === viewYear &&
      today.getMonth() === viewMonth &&
      today.getDate() === day
    );
  }

  const popover = open && position && (
    <div
      ref={popoverRef}
      className={`date-picker-popover date-picker-popover-portal ${position.placement}`}
      style={{
        top: position.top,
        left: position.left,
        width: position.width,
        transform: position.placement === "above" ? "translateY(-100%)" : undefined,
      }}
      role="dialog"
      aria-label="Selecionar data de vencimento"
      onMouseDown={(e) => e.stopPropagation()}
    >
      <div className="date-picker-header">
        <button type="button" className="date-picker-nav" onClick={goToPreviousMonth} aria-label="Mês anterior">
          ‹
        </button>
        <span className="date-picker-month">
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <button type="button" className="date-picker-nav" onClick={goToNextMonth} aria-label="Próximo mês">
          ›
        </button>
      </div>

      <div className="date-picker-weekdays">
        {WEEKDAYS.map((day) => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className="date-picker-days">
        {calendarDays.map((day, index) =>
          day === null ? (
            <span key={`empty-${index}`} className="date-picker-day empty" />
          ) : (
            <button
              key={day}
              type="button"
              className={[
                "date-picker-day",
                isSelected(day) ? "selected" : "",
                isToday(day) ? "today" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              disabled={isDisabled(day)}
              onClick={() => selectDay(day)}
            >
              {day}
            </button>
          ),
        )}
      </div>
    </div>
  );

  return (
    <div className="date-picker" ref={containerRef}>
      <span className="date-picker-label" id={id}>
        {label}
      </span>

      <div className="date-picker-control">
        <button
          ref={triggerRef}
          type="button"
          className="date-picker-trigger"
          onClick={() => setOpen((prev) => !prev)}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-labelledby={id}
        >
          <span className={value ? "date-picker-value" : "date-picker-placeholder"}>
            {formatDisplay(value)}
          </span>
        </button>

        {value && (
          <button
            type="button"
            className="date-picker-clear"
            onClick={() => onChange("")}
            aria-label="Limpar data"
          >
            ×
          </button>
        )}
      </div>

      {popover && createPortal(popover, document.body)}
    </div>
  );
}
