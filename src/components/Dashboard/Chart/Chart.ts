import * as d3 from 'd3';

type propTypes = {
  width: number;
  height: number;
};

type barChartPropTypes = propTypes & {
  data: { name: string; value: number }[];
  dataType: string;
  changeDataType: Function;
};

export const createBarChart = (
  containerEl,
  { width, height, data, dataType, changeDataType }: barChartPropTypes
) => {
  d3.select('.bar-chart-container').remove();

  const svg = d3
    .select(containerEl)
    .append('svg')
    .classed('bar-chart-container', true)
    .attr('width', width)
    .attr('height', height)
    .on('mouseup', () => {
      if (dataType === 'Features') {
        changeDataType('team');
      } else {
        changeDataType('features');
      }
    });

  const margin = { top: 30, right: 0, bottom: 30, left: 40 };

  const x = d3
    .scaleBand()
    .domain(d3.range(data.length))
    .range([margin.left, width - margin.right])
    .padding(0.1);

  const y = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d.value)])
    .nice()
    .range([height - margin.bottom, margin.top]);

  const yAxis = (g) => {
    return g
      .attr('transform', `translate(${margin.left},${margin.bottom - 300})`)
      .call(d3.axisLeft(y).ticks(data.length, 'f'))
      .call((gy) =>
        gy
          .append('text')
          .attr('x', -margin.left)
          .attr('y', 10)
          .attr('fill', 'currentColor')
          .attr('text-anchor', 'start')
          .text(dataType)
      );
  };

  const xAxis = (g) => {
    return g.attr('transform', `translate(0,${height - margin.bottom})`).call(
      d3
        .axisBottom(x)
        .tickFormat((i) => data[i].name)
        .tickSizeOuter(0)
    );
  };

  svg
    .selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .style('fill', 'steelblue')
    .attr('x', (d, i) => x(i))
    .attr('y', (d) => y(d.value))
    .attr('height', (d) => y(0) - y(d.value))
    .attr('width', x.bandwidth());

  svg.append('g').call(xAxis).append('g').call(yAxis);
};
