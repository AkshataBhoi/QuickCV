"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const SheetContext = React.createContext<{
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
} | null>(null)

const Sheet = ({ children }: { children: React.ReactNode }) => {
    const [open, setOpen] = React.useState(false)

    return (
        <SheetContext.Provider value={{ open, setOpen }}>
            {children}
        </SheetContext.Provider>
    )
}

const SheetTrigger = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }
>(({ className, children, asChild = false, ...props }, ref) => {
    const context = React.useContext(SheetContext)
    if (!context) throw new Error("SheetTrigger must be used within Sheet")

    const Comp = asChild ? Slot : "button"

    return (
        <Comp
            ref={ref}
            className={cn(className)}
            onClick={(e) => {
                context.setOpen(true)
                if (props.onClick) props.onClick(e)
            }}
            {...props}
        >
            {children}
        </Comp>
    )
})
SheetTrigger.displayName = "SheetTrigger"

const SheetContent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & { side?: "left" | "right" }
>(({ className, children, side = "right", ...props }, ref) => {
    const context = React.useContext(SheetContext)
    if (!context) throw new Error("SheetContent must be used within Sheet")

    if (!context.open) return null

    return (
        <>
            <div
                className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
                onClick={() => context.setOpen(false)}
            />
            <div
                ref={ref}
                className={cn(
                    "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
                    side === "left" && "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
                    side === "right" && "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
                    className
                )}
                {...props}
            >
                <button
                    className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
                    onClick={() => context.setOpen(false)}
                >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </button>
                {children}
            </div>
        </>
    )
})
SheetContent.displayName = "SheetContent"

const SheetHeader = ({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
    <div
        className={cn(
            "flex flex-col space-y-2 text-center sm:text-left",
            className
        )}
        {...props}
    />
)
SheetHeader.displayName = "SheetHeader"

const SheetTitle = React.forwardRef<
    HTMLHeadingElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn("text-lg font-semibold text-foreground", className)}
        {...props}
    />
))
SheetTitle.displayName = "SheetTitle"

const SheetClose = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }
>(({ className, children, asChild, ...props }, ref) => {
    const context = React.useContext(SheetContext)
    if (!context) throw new Error("SheetClose must be used within Sheet")

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        context.setOpen(false)
        if (props.onClick) props.onClick(e)
    }

    if (asChild && React.isValidElement(children)) {
        return React.cloneElement(children as React.ReactElement<any>, {
            onClick: handleClick,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ref: ref as any,
            ...props,
        })
    }

    return (
        <button
            ref={ref}
            className={cn(className)}
            onClick={handleClick}
            {...props}
        >
            {children}
        </button>
    )
})
SheetClose.displayName = "SheetClose"

export {
    Sheet,
    SheetTrigger,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
}
