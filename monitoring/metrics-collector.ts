/**
 * Metrics Collector
 * Collects and stores performance metrics
 */

interface Metric {
  name: string;
  value: number;
  timestamp: Date;
  tags?: Record<string, string>;
}

interface MetricsConfig {
  supabaseUrl: string;
  supabaseKey: string;
  lineNotifyToken: string;
}

export class MetricsCollector {
  private config: MetricsConfig;
  private buffer: Metric[] = [];

  constructor(config: MetricsConfig) {
    this.config = config;
  }

  /**
   * Record a metric
   */
  record(name: string, value: number, tags?: Record<string, string>): void {
    this.buffer.push({
      name,
      value,
      timestamp: new Date(),
      tags,
    });
  }

  /**
   * Flush metrics to Supabase
   */
  async flush(): Promise<void> {
    if (this.buffer.length === 0) return;

    try {
      const response = await fetch(
        `${this.config.supabaseUrl}/rest/v1/metrics`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': this.config.supabaseKey,
            'Authorization': `Bearer ${this.config.supabaseKey}`,
          },
          body: JSON.stringify(this.buffer),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to flush metrics: ${response.statusText}`);
      }

      this.buffer = [];
    } catch (error) {
      console.error('Error flushing metrics:', error);
    }
  }

  /**
   * Check for anomalies and alert
   */
  async checkAnomalies(): Promise<void> {
    // Query recent metrics
    const response = await fetch(
      `${this.config.supabaseUrl}/rest/v1/metrics?order=timestamp.desc&limit=100`,
      {
        headers: {
          'apikey': this.config.supabaseKey,
          'Authorization': `Bearer ${this.config.supabaseKey}`,
        },
      }
    );

    const metrics: Metric[] = await response.json();

    // Simple anomaly detection
    const errorRates = metrics.filter((m) => m.name === 'error_rate');
    if (errorRates.length > 0) {
      const avgError =
        errorRates.reduce((sum, m) => sum + m.value, 0) / errorRates.length;

      if (avgError > 5) {
        // > 5% error rate
        await this.sendAlert(
          `⚠️ High Error Rate\n\nAverage: ${avgError.toFixed(2)}%\nThreshold: 5%\n\nกรุณาตรวจสอบ!`
        );
      }
    }
  }

  /**
   * Send LINE alert
   */
  private async sendAlert(message: string): Promise<void> {
    try {
      await fetch('https://notify-api.line.me/api/notify', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.lineNotifyToken}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ message }),
      });
    } catch (error) {
      console.error('Failed to send alert:', error);
    }
  }
}
