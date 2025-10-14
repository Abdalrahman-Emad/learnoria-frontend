"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const AccordionContext = React.createContext()

export function Accordion({ children, type = "single", collapsible = true, className }) {
  const [openItem, setOpenItem] = React.useState(null)

  const toggleItem = (value) => {
    if (type === "single") {
      setOpenItem(openItem === value && collapsible ? null : value)
    } else {
      setOpenItem((prev) =>
        prev?.includes(value)
          ? prev.filter((v) => v !== value)
          : [...(prev || []), value]
      )
    }
  }

  return (
    <AccordionContext.Provider value={{ openItem, toggleItem, type }}>
      <div className={cn("space-y-2", className)}>{children}</div>
    </AccordionContext.Provider>
  )
}

export function AccordionItem({ value, children, className }) {
  return (
    <div className={cn("border border-border rounded-lg overflow-hidden", className)} data-value={value}>
      {children}
    </div>
  )
}

export function AccordionTrigger({ children, value, className }) {
  const { openItem, toggleItem, type } = React.useContext(AccordionContext)

  const isOpen = type === "single" ? openItem === value : openItem?.includes(value)

  return (
    <button
      onClick={() => toggleItem(value)}
      className={cn(
        "flex w-full items-center justify-between px-4 py-3 font-medium text-left transition hover:bg-accent",
        className
      )}
    >
      {children}
      <ChevronDown
        className={cn(
          "h-5 w-5 text-muted-foreground transition-transform duration-300",
          isOpen ? "rotate-180" : ""
        )}
      />
    </button>
  )
}

export function AccordionContent({ children, value, className }) {
  const { openItem, type } = React.useContext(AccordionContext)

  const isOpen = type === "single" ? openItem === value : openItem?.includes(value)

  return (
    <div
      className={cn(
        "overflow-hidden transition-all duration-300",
        isOpen ? "max-h-96" : "max-h-0"
      )}
    >
      <div className={cn("px-4 pb-4 text-sm text-muted-foreground", className)}>
        {children}
      </div>
    </div>
  )
}
