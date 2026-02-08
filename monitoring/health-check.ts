/**
 * Health Check System
 * Monitors service health and sends alerts via LINE
 */

interface HealthCheckResult {
  service: string;
  status: 'healthy' | 'degraded' | 'down';
  responseTime: number;
  timestamp: Date;
  details?: string;
}

interface AlertConfig {
  slackWebhookUrl: string;
  alertThreshold: {
    responseTime: number; // ms
    errorRate: number; // percentage
  };
}

export class HealthCheckMonitor {
  private config: AlertConfig;
  private services: Map<string, HealthCheckResult>;

  constructor(config: AlertConfig) {
    this.config = config;
    this.services = new Map();
  }

  /**
   * Check service health
   */
  async checkService(
    serviceName: string,
    url: string
  ): Promise<HealthCheckResult> {
    const startTime = Date.now();

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: { 'User-Agent': 'MOSSES-Monitor/1.0' },
      });

      const responseTime = Date.now() - startTime;
      const status = response.ok
        ? responseTime > this.config.alertThreshold.responseTime
          ? 'degraded'
          : 'healthy'
        : 'down';

      const result: HealthCheckResult = {
        service: serviceName,
        status,
        responseTime,
        timestamp: new Date(),
        details: response.ok ? undefined : `HTTP ${response.status}`,
      };

      this.services.set(serviceName, result);

      // Send alert if degraded or down
      if (status !== 'healthy') {
        await this.sendAlert(result);
      }

      return result;
    } catch (error) {
      const result: HealthCheckResult = {
        service: serviceName,
        status: 'down',
        responseTime: Date.now() - startTime,
        timestamp: new Date(),
        details: error instanceof Error ? error.message : 'Unknown error',
      };

      this.services.set(serviceName, result);
      await this.sendAlert(result);

      return result;
    }
  }

  /**
   * Send Slack alert
   */
  private async sendAlert(result: HealthCheckResult): Promise<void> {
    const message = this.formatAlertMessage(result);

    try {
      await fetch(this.config.slackWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: message,
          username: 'MOSSES Monitor',
          icon_emoji: ':robot_face:',
        }),
      });
    } catch (error) {
      console.error('Failed to send Slack alert:', error);
    }
  }

  /**
   * Format alert message for Slack
   */
  private formatAlertMessage(result: HealthCheckResult): string {
    const emoji = result.status === 'down' ? '🔴' : '⚠️';
    const status = result.status === 'down' ? 'DOWN' : 'DEGRADED';

    return `${emoji} MOSSES Alert

Service: ${result.service}
Status: ${status}
Response Time: ${result.responseTime}ms
Time: ${result.timestamp.toLocaleString('th-TH')}
${result.details ? `\nDetails: ${result.details}` : ''}

กรุณาตรวจสอบด่วน!`;
  }

  /**
   * Get all service statuses
   */
  getStatus(): Record<string, HealthCheckResult> {
    return Object.fromEntries(this.services);
  }

  /**
   * Check all services
   */
  async checkAll(services: Record<string, string>): Promise<void> {
    const checks = Object.entries(services).map(([name, url]) =>
      this.checkService(name, url)
    );

    await Promise.all(checks);
  }
}

// Export for use in Cloudflare Workers
export default {
  async scheduled(
    event: ScheduledEvent,
    env: Env,
    ctx: ExecutionContext
  ): Promise<void> {
    const monitor = new HealthCheckMonitor({
      slackWebhookUrl: env.SLACK_WEBHOOK_URL,
      alertThreshold: {
        responseTime: 3000, // 3s
        errorRate: 5, // 5%
      },
    });

    const services = {
      'Supabase': env.SUPABASE_URL + '/health',
      'n8n': 'https://mossad.app.n8n.cloud/healthz',
      'Vercel': env.VERCEL_DEPLOY_URL || 'https://example.vercel.app',
    };

    await monitor.checkAll(services);

    console.log('Health check completed:', monitor.getStatus());
  },
};
