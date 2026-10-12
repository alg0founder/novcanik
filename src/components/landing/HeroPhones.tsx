import { PhoneFrame } from './PhoneFrame'
import { DashboardScreen } from './screens/DashboardScreen'
import { BudgetScreen } from './screens/BudgetScreen'
import { ReportsScreen } from './screens/ReportsScreen'

/** Three phones fanned out; on small screens only the front one, cropped at the bottom. */
export function HeroPhones() {
  return (
    <div className="relative flex justify-center items-start h-[440px] md:h-[560px] [clip-path:inset(-200px_-50vw_0_-50vw)]">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_40%_60%_at_50%_75%,rgba(249,115,22,0.22),transparent_70%)]" />
      <div className="hidden md:block absolute top-16 -translate-x-[62%] -rotate-[8deg] opacity-70">
        <PhoneFrame width={250} tab="budzet"><BudgetScreen /></PhoneFrame>
      </div>
      <div className="hidden md:block absolute top-16 translate-x-[62%] rotate-[8deg] opacity-70">
        <PhoneFrame width={250} tab="izvestaji"><ReportsScreen /></PhoneFrame>
      </div>
      <div className="relative z-10 animate-rise">
        <PhoneFrame width={290} tab="pregled"><DashboardScreen /></PhoneFrame>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#111417] to-transparent z-20 pointer-events-none" />
    </div>
  )
}
