/**
 * Error logging utility for the NASA Space Explorer application
 */

export interface ErrorLog {
  id: string;
  timestamp: Date;
  level: 'error' | 'warn' | 'info';
  message: string;
  component?: string;
  stack?: string;
  userAgent?: string;
  url?: string;
  additionalData?: Record<string, any>;
}

class ErrorLogger {
  private logs: ErrorLog[] = [];
  private maxLogs = 100;

  /**
   * Log an error with context information
   */
  logError(
    message: string,
    error?: Error,
    component?: string,
    additionalData?: Record<string, any>
  ): void {
    const errorLog: ErrorLog = {
      id: this.generateId(),
      timestamp: new Date(),
      level: 'error',
      message,
      component,
      stack: error?.stack,
      userAgent: navigator.userAgent,
      url: window.location.href,
      additionalData,
    };

    this.addLog(errorLog);
    
    // Console logging for development
    if (process.env.NODE_ENV === 'development') {
      console.error('[ErrorLogger]', errorLog);
    }

    // In production, you might want to send to a logging service
    if (process.env.NODE_ENV === 'production') {
      this.sendToLoggingService(errorLog);
    }
  }

  /**
   * Log a warning
   */
  logWarning(
    message: string,
    component?: string,
    additionalData?: Record<string, any>
  ): void {
    const warningLog: ErrorLog = {
      id: this.generateId(),
      timestamp: new Date(),
      level: 'warn',
      message,
      component,
      userAgent: navigator.userAgent,
      url: window.location.href,
      additionalData,
    };

    this.addLog(warningLog);
    
    if (process.env.NODE_ENV === 'development') {
      console.warn('[ErrorLogger]', warningLog);
    }
  }

  /**
   * Log an info message
   */
  logInfo(
    message: string,
    component?: string,
    additionalData?: Record<string, any>
  ): void {
    const infoLog: ErrorLog = {
      id: this.generateId(),
      timestamp: new Date(),
      level: 'info',
      message,
      component,
      userAgent: navigator.userAgent,
      url: window.location.href,
      additionalData,
    };

    this.addLog(infoLog);
    
    if (process.env.NODE_ENV === 'development') {
      console.info('[ErrorLogger]', infoLog);
    }
  }

  /**
   * Get all logs
   */
  getLogs(): ErrorLog[] {
    return [...this.logs];
  }

  /**
   * Get logs by level
   */
  getLogsByLevel(level: 'error' | 'warn' | 'info'): ErrorLog[] {
    return this.logs.filter(log => log.level === level);
  }

  /**
   * Clear all logs
   */
  clearLogs(): void {
    this.logs = [];
  }

  /**
   * Export logs as JSON
   */
  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2);
  }

  private addLog(log: ErrorLog): void {
    this.logs.unshift(log);
    
    // Keep only the latest logs
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(0, this.maxLogs);
    }
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  private async sendToLoggingService(log: ErrorLog): Promise<void> {
    try {
      // In a real application, you would send to a logging service like:
      // - Sentry
      // - LogRocket
      // - DataDog
      // - CloudWatch
      // - Custom logging endpoint
      
      // For now, we'll just store in localStorage as a fallback
      const existingLogs = localStorage.getItem('nasa-app-error-logs');
      const logs = existingLogs ? JSON.parse(existingLogs) : [];
      logs.unshift(log);
      
      // Keep only last 50 logs in localStorage
      const trimmedLogs = logs.slice(0, 50);
      localStorage.setItem('nasa-app-error-logs', JSON.stringify(trimmedLogs));
    } catch (error) {
      console.error('Failed to log error to service:', error);
    }
  }
}

// Create singleton instance
export const errorLogger = new ErrorLogger();

/**
 * Global error handler for unhandled errors
 */
export const setupGlobalErrorHandling = (): void => {
  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    errorLogger.logError(
      'Unhandled Promise Rejection',
      event.reason instanceof Error ? event.reason : new Error(String(event.reason)),
      'Global',
      { type: 'unhandledrejection' }
    );
  });

  // Handle global errors
  window.addEventListener('error', (event) => {
    errorLogger.logError(
      'Global Error',
      event.error || new Error(event.message),
      'Global',
      {
        type: 'global',
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
      }
    );
  });
};

/**
 * React Error Boundary helper
 */
export const logComponentError = (
  error: Error,
  componentName: string,
  errorInfo?: { componentStack?: string | null | undefined }
): void => {
  errorLogger.logError(
    `React Component Error in ${componentName}`,
    error,
    componentName,
    { errorInfo }
  );
};
