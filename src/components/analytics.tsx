import Script from 'next/script';

type ScriptAttributes = Record<string, string | boolean>;

function parseAttributes(input: string): ScriptAttributes {
  const attributes: ScriptAttributes = {};
  const attrRegex = /([\w:-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g;

  for (const match of input.matchAll(attrRegex)) {
    const [, key, doubleQuoted, singleQuoted, unquoted] = match;
    const value = doubleQuoted ?? singleQuoted ?? unquoted;
    attributes[key] = value ?? true;
  }

  return attributes;
}

function parseScripts(snippet: string) {
  const scriptRegex = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;

  return Array.from(snippet.matchAll(scriptRegex)).map((match) => ({
    attributes: parseAttributes(match[1] ?? ''),
    content: (match[2] ?? '').trim(),
  }));
}

export default function Analytics() {
  const isDevMode = process.env.NODE_ENV === 'development';
  const snippet = process.env.NEXT_PUBLIC_ANALYTICS_SCRIPT;

  if (!snippet || isDevMode) {
    return null;
  }

  const scripts = parseScripts(snippet);

  if (scripts.length === 0) {
    return null;
  }

  return (
    <>
      {scripts.map(({ attributes, content }, index) => {
        const scriptProps = attributes as React.ComponentProps<typeof Script>;

        if (content) {
          return <Script key={index} id={`analytics-inline-${index}`} {...scriptProps} dangerouslySetInnerHTML={{ __html: content }} />;
        }

        return <Script key={index} id={`analytics-external-${index}`} {...scriptProps} />;
      })}
    </>
  );
}
