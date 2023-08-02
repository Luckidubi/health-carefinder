"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";



export function Overview({data}:any) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} margin={{ right: 20 }}>
        <XAxis
          dataKey="state"
          stroke="#888888"
          angle={-90}
          textAnchor="end"
          fontSize={11}
          tickLine={true}
          axisLine={false}
          interval={0}
          height={80} // Adjust height to allow scrolling
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={true}
          axisLine={true}
          tickFormatter={(value: any) => `${value}`}
        />
        <Bar dataKey="total" name="Total Hospitals Per State" fill="#1c3d6c" radius={[4, 4, 0, 0]} />
        <Tooltip />
        <Legend verticalAlign="top" height={36} />
      </BarChart>
    </ResponsiveContainer>
  );
}
