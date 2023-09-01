import styled from 'styled-components';
import { Link } from 'react-router-dom';
import CodeMirror from '@uiw/react-codemirror';
import { color } from '@uiw/codemirror-extensions-color';
import { langs } from '@uiw/codemirror-extensions-langs';
import { Warpper } from '../../../components/Warpper';
import { themeData } from '../themes/Datas';
import { toSnakeCase, toTitleCase } from '../../../utils/utils';

const ThemesWarpper = styled.div`
  grid-template-columns: repeat(3, minmax(0, 1fr));
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2.5rem;
  display: grid;
  padding: 2.6rem;
  a {
    text-decoration: none;
  }
`;

const ThemeCard = styled.div`
  padding: 1rem;
  box-shadow:
    0 0 #0000,
    0 0 #0000,
    0 0 #0000,
    0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border-radius: 0.5rem;
  border: 1px solid var(--color-neutral-muted);
  background-color: var(--color-canvas-subtle);
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.2s;
  &:hover {
    transform: translate(0, -0.25rem) rotate(0) skewX(0) skewY(0) scaleX(1) scaleY(1);
  }
`;

const Title = styled.div`
  font-weight: 600;
  padding-bottom: 0.68rem;
`;

const codeString = `import React, { useState } from 'react';

// My favorite component
const Counter = () => {
  const [value, setValue] = useState(0);
  return (
    <span>{value}</span>
  );
};`;

const CodeEditor = styled.div`
  border-radius: 0.375rem;
  overflow: hidden;
  position: relative;
  &::before {
    content: '';
    display: block;
    height: 100%;
    background: transparent;
    width: 100%;
    position: absolute;
    z-index: 1;
  }
`;

export function Component() {
  return (
    <Warpper>
      <ThemesWarpper>
        {Object.keys(themeData).map((name, idx) => {
          const linkName = (toSnakeCase(name) || [])
            .join('-')
            .replace(/-light$/, '/light')
            .replace(/-dark$/, '/dark');
          const themeExtension = themeData[name as keyof typeof themeData];
          return (
            <Link key={idx} to={`/theme/data/${linkName}`}>
              <ThemeCard>
                <Title>{toTitleCase(name)}</Title>
                <CodeEditor>
                  <CodeMirror
                    theme={themeExtension}
                    value={codeString}
                    height="185px !important"
                    extensions={[color, langs.jsx()]}
                  />
                </CodeEditor>
              </ThemeCard>
            </Link>
          );
        })}
      </ThemesWarpper>
    </Warpper>
  );
}
