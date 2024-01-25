"use client"
import React, { FC, useState } from 'react'

type IProps = {
  day: DaysOfTheWeek | undefined;
  setDay: (date: DaysOfTheWeek | undefined) => void
}

const days = [
  {
    value: "Sun",
    label: "CN"
  },
  {
    value: "Mon",
    label: "T2"
  },
  {
    value: "Tues",
    label: "T3"
  },
  {
    value: "Wed",
    label: "T4"
  },
  {
    value: "Thurs",
    label: "T5"
  },
  {
    value: "Fri",
    label: "T6"
  },
  {
    value: "Sat",
    label: "T7"
  },
]

const DaysOfTheWeekPick: FC<IProps> = ({ day, setDay }) => {
  const [daySelected, setDaySelected] = useState<DaysOfTheWeek>(day || "Sun")
  return (
    <div className='flex items-center gap-2'>
      {
        days.map(item => (
          <div
            key={item.value}
            className={`${item.value === daySelected ? "border-anime" : ""} w-[48px] text-center font-mono text-base tabular-nums border caret-transparent focus:bg-accent focus:text-accent-foreground [&::-webkit-inner-spin-button]:appearance-none  px-3 py-5 rounded-xl max-h-[42px] flex items-center justify-center cursor-pointer`}
            onClick={() => {
              setDay(item.value as DaysOfTheWeek)
              setDaySelected(item.value as DaysOfTheWeek)
            }}
          >
            <span>{item.label}</span>{/* Sun */}
          </div>
        ))
      }
    </div>
  )
}

export default DaysOfTheWeekPick