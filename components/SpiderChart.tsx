
import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';
import { Theme } from '../types';

interface SpiderChartProps {
    data: any[];
    color: string;
    theme: Theme;
}

const SpiderChart: React.FC<SpiderChartProps> = ({ data, color, theme }) => {
    // Format subject names to be friendlier (remove hyphens)
    const formattedData = data.map(d => ({
        ...d,
        subject: d.subject.replace('-', ' ')
    }));

    return (
        <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="75%" data={formattedData}>
                <PolarGrid 
                    gridType="polygon" 
                    stroke={theme === 'dark' ? '#333' : '#e5e7eb'} 
                    strokeWidth={1.5}
                />
                <PolarAngleAxis
                    dataKey="subject"
                    tick={{
                        fill: theme === 'dark' ? '#e5e7eb' : '#4b5563',
                        fontSize: 11,
                        fontWeight: 700,
                        fontFamily: 'Fredoka'
                    }}
                />
                <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} axisLine={false} />
                <Radar
                    name="Score"
                    dataKey="A"
                    stroke={color}
                    strokeWidth={3}
                    fill={color}
                    fillOpacity={0.4}
                    isAnimationActive={true}
                    dot={{ r: 4, fill: color, strokeWidth: 2, stroke: theme === 'dark' ? '#202020' : '#fff' }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                />
                <Tooltip
                     contentStyle={{
                         backgroundColor: theme === 'dark' ? '#202020' : '#fff',
                         borderRadius: '16px',
                         border: '1px solid ' + (theme === 'dark' ? '#333' : '#e5e7eb'),
                         boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                         fontWeight: 'bold',
                         color: theme === 'dark' ? '#fff' : '#1e293b',
                         padding: '12px 16px'
                     }}
                     itemStyle={{ color: color }}
                     cursor={false}
                     separator=": "
                />
            </RadarChart>
        </ResponsiveContainer>
    );
};

export default SpiderChart;
