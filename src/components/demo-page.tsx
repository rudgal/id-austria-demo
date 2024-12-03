import { DemoHeader } from "@/components/demo-header"
import { DemoSectionLeft } from "@/components/demo-section-left"
import { DemoSectionRight } from "@/components/demo-section-right"
import { DemoFooter } from "@/components/demo-footer"

export default function DemoPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <DemoHeader />
      <main className="flex flex-grow">
        <DemoSectionLeft />
        <DemoSectionRight />
      </main>
      <DemoFooter />
    </div>
  )
}

