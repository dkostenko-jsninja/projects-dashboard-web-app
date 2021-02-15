import React, { useEffect, useRef, useState } from 'react';

import { Typography } from '@material-ui/core';

import { IProjectDetails } from '../../../interfaces/project';

import Chart from '../Chart';

type propTypes = {
  projects: IProjectDetails[];
};

type pieChartData = {
  value: number;
  color: string;
  legendText: string;
};

function DeadlineRatioChart({ projects }: propTypes) {
  const chartRef = useRef(null);

  const [data, setData] = useState<pieChartData[]>([]);

  useEffect(() => {
    updateData();
  }, []);

  useEffect(() => {
    if (data.length) {
      Chart.createPieChart(chartRef.current, {
        width: 500,
        height: 500,
        data,
      });
    }
  }, [data]);

  const updateData = () => {
    let projectsWithRisk = 0;
    let projectsWithoutRisk = 0;

    projects.forEach((project) => {
      const unassignedFeatures = project.features.filter((feature) => !feature.developerUuid);
      const daysLeft = daysBetween(new Date().toISOString(), project.expirationDate);

      if (daysLeft >= unassignedFeatures.length) {
        ++projectsWithoutRisk;
      } else {
        ++projectsWithRisk;
      }
    });

    const newData: pieChartData[] = [];

    if (projectsWithRisk) {
      newData.push({
        color: '#de2d26',
        value: percentage(projectsWithRisk, projects.length),
        legendText: 'Projects that are at risk of not making the deadline',
      });
    }

    if (projectsWithoutRisk) {
      newData.push({
        color: '#31a354',
        value: percentage(projectsWithoutRisk, projects.length),
        legendText: 'Projects that will make the deadline',
      });
    }

    setData(newData);
  };

  const daysBetween = (firstISODate: string, secondISODate: string): number => {
    const firstDate = new Date(firstISODate);
    const secondDate = new Date(secondISODate);

    const first = new Date(firstDate.getFullYear(), firstDate.getMonth(), firstDate.getDate());
    const second = new Date(secondDate.getFullYear(), secondDate.getMonth(), secondDate.getDate());

    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const millisBetween = second.getTime() - first.getTime();
    const days = millisBetween / millisecondsPerDay;

    return Math.floor(days);
  };

  const percentage = (firstNum: number, secondNum: number): number => {
    return Math.round((firstNum * 100) / secondNum);
  };

  return (
    <div className="c-chart-block">
      <Typography variant="h6" align="center">
        Deadline ratio
      </Typography>

      <div className="c-chart" ref={chartRef} />
    </div>
  );
}

export default DeadlineRatioChart;
