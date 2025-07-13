export default function Analytics() {
  // Skip analytics in development mode
  const isDevMode = process.env.NODE_ENV === 'development';
  const analyticsSrc = process.env.NEXT_PUBLIC_ANALYTICS_SRC;
  if (!analyticsSrc || isDevMode) {
    return null;
  }

  const analyticsProps: Record<string, string> = {};
  Object.keys(process.env).forEach((key) => {
    if (key.startsWith('NEXT_PUBLIC_ANALYTICS_')) {
      const propName = key.replace('NEXT_PUBLIC_ANALYTICS_', '').toLowerCase().replace(/_/g, '-');
      analyticsProps[propName] = process.env[key] || '';
    }
  });

  return <script src={analyticsSrc} async {...analyticsProps} />;
}
