/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import type { BadgeProps, CalendarProps } from 'antd';
import { Badge, Calendar } from 'antd';
import type { Dayjs } from 'dayjs';



const DoctorHomeCalender: React.FC = (props:any) => {
    console.log("props in calender",props);
    const getListData = (value: Dayjs) => {
        let listData: { type: string; content: string }[] = []; // Specify the type of listData
        props.data.forEach((item: any) => {
            switch (value.date()) {
                case 8:
                    listData = [
                        { type: 'warning', content: 'This is warning event.' },
    
                    ];
                    break;
                case 10:
                    listData = [
                        { type: 'warning', content: 'This is warning event.' },
    
                    ];
                    break;
                case 15:
                    listData = [
                        { type: 'warning', content: 'This is warning event' },
    
                    ];
                    break;
                default:
            }
        });

        return listData || [];
    };

    const getMonthData = (value: Dayjs) => {
        if (value.month() === 8) {
            return 1394;
        }
    };
    const monthCellRender = (value: Dayjs) => {
        const num = getMonthData(value);
        return num ? (
            <div className="notes-month">
                <section>{num}</section>
                <span>Backlog number</span>
            </div>
        ) : null;
    };

    const dateCellRender = (value: Dayjs) => {
        const listData = getListData(value);
        return (
            <ul className="events">
                {listData.map((item) => (
                    <li key={item.content}>
                        <Badge status={item.type as BadgeProps['status']} text={item.content} />
                    </li>
                ))}
            </ul>
        );
    };

    const cellRender: CalendarProps<Dayjs>['cellRender'] = (current, info) => {
        if (info.type === 'date') return dateCellRender(current);
        if (info.type === 'month') return monthCellRender(current);
        return info.originNode;
    };

    return <Calendar cellRender={cellRender} fullscreen={false} />;
};

export default DoctorHomeCalender;
