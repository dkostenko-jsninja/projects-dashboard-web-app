import React, { useEffect, useRef, useState } from 'react';

import { Typography } from '@material-ui/core';

import { IProject } from '../../../interfaces/project';

import Chart from '../Chart';

type propTypes = {
  projects: IProject[];
};

function DetailsChart({ projects }: propTypes) {
  const [data, setData] = useState<{ name: string; value: number }[]>([]);
  const [dataType, setDataType] = useState<string>('Features');

  const chartRef = useRef(null);

  useEffect(() => {
    updateChartData('features');
  }, []);

  useEffect(() => {
    if (data.length) {
      Chart.createBarChart(chartRef.current, {
        width: 1000,
        height: 300,
        dataType,
        data,
        changeDataType,
      });
    }
  }, [data]);

  const updateChartData = (type: 'features' | 'team') => {
    const newData = projects.map((project) => {
      return { name: project.name, value: project[type].length };
    });

    setData(newData);
  };

  const changeDataType = (type: 'features' | 'team') => {
    if (type === 'features') {
      setDataType('Features');
      updateChartData('features');
    }

    if (type === 'team') {
      setDataType('Developers');
      updateChartData('team');
    }
  };

  return (
    <div className="c-chart-block">
      <Typography variant="h6" align="center">
        {dataType === 'Features' ? 'Amount of project features' : `Project's team size`}
      </Typography>

      <div className="c-chart c-chart--details" ref={chartRef} />
    </div>
  );
}

export default DetailsChart;
