import { Bar } from "react-chartjs-2"
import { useHolderDistribution } from "@/hooks/useHolderDistribution"
import { formatNumber, formatPercentage } from "@/lib/utils"
import { Info } from "lucide-react"
import { Chart } from 'chart.js';
export function HolderDistributionChart() {
  const { distribution, loading, error } = useHolderDistribution();

  if (loading) {
    return (
      <div className="rounded-xl border border-gray-800 bg-black/60 p-6 text-center">
        <p className="text-gray-400">Loading holder distribution data...</p>
      </div>
    );
  }

  if (error || !distribution) {
    return (
      <div className="rounded-xl border border-gray-800 bg-black/60 p-6 text-center">
        <p className="text-gray-400">Unable to load holder distribution at this time.</p>
      </div>
    );
  }

  const allLabels = [
    ...distribution.tiers.map(tier => tier.tier),
    ...distribution.specialAddresses.map(addr => addr.name)
  ];
  
  // Create holder count data array, with 1 for each special address
  const holderCountData = [
    ...distribution.tiers.map(tier => tier.holderCount),
    ...distribution.specialAddresses.map(() => 1) // Each special address counts as 1 holder
  ];
  
  // Create supply percentage data array
  const supplyData = [
    ...distribution.tiers.map(tier => tier.supplyPercentage),
    ...distribution.specialAddresses.map(addr => addr.supplyPercentage)
  ];
  
  // Use different colors for regular tiers vs special addresses
  const regularLength = distribution.tiers.length;
  
  // Create custom colors for special addresses
  const specialColors = distribution.specialAddresses.map(addr => {
    // Special color for WUD LP
    if (addr.name === "WUD LP") return '#00ff8c';
    // OG Dev Burn
    if (addr.name === "OG Dev Burn") return '#fdff00';
    // Zeitgeist Treasury
    if (addr.name === "Zeitgeist Treasury") return '#00eaff';
    // WUD Treasury
    if (addr.name === "WUD Treasury") return '#ff9900';
    
    return '#a855f7'; 
  });
  
  const holderBackgroundColors = [
    ...Array(regularLength).fill('#88c8ff'),
    ...specialColors
  ];
  
  const supplyBackgroundColors = [
    ...Array(regularLength).fill('#ff2e70'),
    ...specialColors
  ];

  const chartData = {
    labels: allLabels,
    datasets: [
      {
        label: 'Holder Count',
        data: holderCountData,
        backgroundColor: holderBackgroundColors,
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 4,
      },
      {
        label: 'Supply Percentage',
        data: supplyData,
        backgroundColor: supplyBackgroundColors,
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius: 4,
        yAxisID: 'y1',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#ffffff',
          maxRotation: function(context: any) {
            const width = context.chart.width;
            return width < 600 ? 90 : 0;
          },
          minRotation: function(context: any) {
            const width = context.chart.width;
            return width < 600 ? 45 : 0;
          },
          autoSkip: true,
          autoSkipPadding: 4,
          font: {
            size: function(context: any) {
              const width = context.chart.width;
              return width < 600 ? 8 : 12;
            }
          }
        },
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#ffffff',
        },
        title: {
          display: true,
          text: 'Number of Holders',
          color: '#88c8ff',
        },
      },
      y1: {
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          color: '#ff2e70',
        },
        title: {
          display: true, 
          text: 'Supply Percentage (%)',
          color: '#ff2e70',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: function(context: any) {
          const width = context.chart?.width || 0;
          return width < 600 ? 'bottom' : 'top';
        },
        labels: {
          color: '#ffffff',
          boxWidth: function(context: any) {
            const width = context.chart?.width || 0;
            return width < 600 ? 8 : 12;
          },
          padding: function(context: any) {
            const width = context.chart?.width || 0;
            return width < 600 ? 5 : 10;
          },
          font: {
            size: function(context: any) {
              const width = context.chart?.width || 0;
              return width < 600 ? 8 : 12;
            }
          },
          generateLabels: (chart: any) => {
            const defaultLabels = Chart.defaults.plugins.legend.labels.generateLabels(chart);
            
            const width = chart.width || 0;
            if (width < 600) {
              return defaultLabels.slice(0, 2);
            }
            
            distribution.specialAddresses.forEach((addr, index) => {
              defaultLabels.push({
                text: `${addr.name} (${formatPercentage(addr.supplyPercentage, 2)})`,
                fillStyle: specialColors[index],
                strokeStyle: '#000000',
                lineWidth: 1,
                hidden: false,
                index: defaultLabels.length
              });
            });
            
            return defaultLabels;
          }
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const datasetLabel = context.dataset.label || '';
            const value = context.parsed.y;
            const index = context.dataIndex;
            
            // Special tooltip for special addresses
            if (index >= distribution.tiers.length) {
              const specialIndex = index - distribution.tiers.length;
              const address = distribution.specialAddresses[specialIndex];
              
              if (datasetLabel === 'Holder Count') {
                return `${address.name}: 1 address`;
              } else {
                return `${address.name}: ${formatPercentage(value, 2)} (${formatNumber(address.balance)} WUD)`;
              }
            }
            
            if (datasetLabel === 'Holder Count') {
              return `${datasetLabel}: ${formatNumber(value)}`;
            } else {
              return `${datasetLabel}: ${formatPercentage(value, 2)}`;
            }
          },
        },
      },
    },
  };

  // Calculate total special address balance and percentage
  const totalSpecialBalance = distribution.specialAddresses.reduce(
    (sum, addr) => sum + addr.balance, 0
  );
  const totalSpecialPercentage = distribution.specialAddresses.reduce(
    (sum, addr) => sum + addr.supplyPercentage, 0
  );

  return (
    <div className="rounded-xl border border-gray-800 bg-black/60 p-6">
      <div className="mb-4 p-2 sm:p-4 border border-gray-700 rounded-lg bg-black/40">
        <div className="flex items-start gap-2">
          <Info className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-white">About this chart</h4>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              This chart shows the distribution of WUD tokens across different holder tiers.
              Special addresses like the LP, treasuries, and dev burn addresses are shown separately 
              to provide a more accurate view of the real token distribution.
              In total, these special addresses hold {formatPercentage(totalSpecialPercentage, 2)} of the supply 
              ({formatNumber(totalSpecialBalance)} WUD).
            </p>
          </div>
        </div>
      </div>
      
      <div className="h-[300px] sm:h-[400px]">
        <Bar data={chartData} options={chartOptions as any} />
      </div>
      
      <div className="mt-2 sm:mt-4 text-right text-xs text-gray-400">
        Last updated: {new Date(distribution.lastUpdated).toLocaleString()}
      </div>
    </div>
  );
} 