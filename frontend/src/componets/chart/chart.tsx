import 'core-js/stable';
import 'regenerator-runtime/runtime';
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import am5locales_pt_BR from '@amcharts/amcharts5/locales/pt_BR';

import { Box, Paper, Typography } from '@mui/material';
import { formatNumber } from '../../util/infoFormat';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';

interface Data {
    data: { date: string; value: number }[];
}

const CustomizedLabel: React.FunctionComponent<any> = (props: any) => {
    const { x, y, stroke, value } = props;

    return (
        <text
            x={x}
            y={y}
            dy={-4}
            fill={stroke}
            fontSize={10}
            textAnchor="middle">
            {formatNumber(value)}
        </text>
    );
};

const CustomizedAxisTick: React.FunctionComponent<any> = (props: any) => {
    const { x, y, stroke, payload } = props;

    const value = payload.value.replace(`/${new Date().getFullYear()}`, '');

    return (
        <g transform={`translate(${x},${y})`}>
            <text
                // x={0}
                // y={0}
                dy={16}
                textAnchor="end"
                fill="#666"
                transform="rotate(-20)">
                {value}
            </text>
        </g>
    );
};

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <Paper
                elevation={1}
                style={{ backgroundColor: '#f5f5f5', color: 'black' }}>
                <Box p={2}>
                    <Typography variant="body1">{label}</Typography>
                    <Typography variant="body2">
                        R$ {formatNumber(payload[0].value)}
                    </Typography>
                </Box>
            </Paper>
        );
    }

    return null;
};

const ChartComponent: React.FC<Data> = ({ data }) => {
    const theme = useTheme();

    React.useEffect(() => {
        let root = am5.Root.new('chartdiv');
        root.locale = am5locales_pt_BR;
        root.numberFormatter.set('numberFormat', '#,###.00');

        if (data.length > 0) {
            handleChart(data, root);
        }
        return () => {
            root.dispose();
        };
    }, [data]);

    const handleChart = (data: any[], root: any) => {
        // Set themes
        // https://www.amcharts.com/docs/v5/concepts/themes/
        root.dateFormatter.set('dateFormat', 'd/MM/yyyy');

        root.setThemes([am5themes_Animated.new(root)]);
        root._logo.dispose();

        // Create chart
        // https://www.amcharts.com/docs/v5/charts/xy-chart/
        let chart = root.container.children.push(
            am5xy.XYChart.new(root, {
                panX: true,
                panY: true,
                wheelX: 'panX',
                wheelY: 'zoomX',
                pinchZoomX: true,
                maxTooltipDistance: 0,
                showTooltipOn: 'always',
            }),
        );

        // Add cursor
        // https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
        let cursor = chart.set(
            'cursor',
            am5xy.XYCursor.new(root, {
                behavior: 'none',
            }),
        );
        cursor.lineY.set('visible', false);

        // Create axes
        // https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
        let xAxis = chart.xAxes.push(
            am5xy.DateAxis.new(root, {
                maxDeviation: 0.2,
                baseInterval: {
                    timeUnit: 'hour',
                    count: 5,
                },
                start: 0.8,
                dateFormatter: 'dd/MM/yyyy',
                renderer: am5xy.AxisRendererX.new(root, {
                    strokeWidth: 2,
                }),
                tooltip: am5.Tooltip.new(root, {}),
            }),
        );

        let yAxis = chart.yAxes.push(
            am5xy.ValueAxis.new(root, {
                renderer: am5xy.AxisRendererY.new(root, {
                    minGridDistance: 20,
                }),
                tooltip: am5.Tooltip.new(root, {}),
            }),
        );

        // Add series
        // https://www.amcharts.com/docs/v5/charts/xy-chart/series/
        let series = chart.series.push(
            am5xy.LineSeries.new(root, {
                name: 'Series',
                xAxis: xAxis,
                yAxis: yAxis,
                valueYField: 'value',
                valueXField: 'date',
                sequencedInterpolation: true,
                tooltip: am5.Tooltip.new(root, {
                    labelText: '{valueY}',
                }),
            }),
        );

        // Add scrollbar
        // https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
        var scrollbarX = am5.Scrollbar.new(root, {
            orientation: 'horizontal',
        });

        chart.set('scrollbarX', scrollbarX);
        chart.bottomAxesContainer.children.push(scrollbarX);
        chart.set('scrollbarX', scrollbarX);

        // Set data
        // data = generateDatas(1200);
        series.data.setAll(data);

        // Make stuff animate on load
        // https://www.amcharts.com/docs/v5/concepts/animations/
        series.appear(1000);
        chart.appear(1000, 100);
    };

    return (
        <React.Fragment>
            {/* <ResponsiveContainer>
                <LineChart
                    data={data}
                    width={500}
                    height={200}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 50,
                    }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="date"
                        height={60}
                        stroke={theme.palette.text.secondary}
                        style={theme.typography.body2}
                        tick={<CustomizedAxisTick />}
                    />
                    <YAxis
                        stroke={theme.palette.text.secondary}
                        style={theme.typography.body2}>
                        <Label
                            angle={270}
                            position="left"
                            style={{
                                textAnchor: 'middle',
                                fill: theme.palette.text.primary,
                                ...theme.typography.body1,
                            }}>
                            Totais (R$)
                        </Label>
                    </YAxis>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="value"
                        name="Valor"
                        stroke={theme.palette.primary.main}>
                        {' '}
                        <LabelList content={<CustomizedLabel />} />
                    </Line>

                    <Brush dataKey="value" height={30} />
                </LineChart>
            </ResponsiveContainer> */}
            <div
                id="chartdiv"
                style={{
                    width: '100%',
                    height: '500px',
                }}></div>
        </React.Fragment>
    );
};

export default ChartComponent;
