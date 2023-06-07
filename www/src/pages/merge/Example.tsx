import { Fragment, useRef, useState } from 'react';
import CodeMirrorMerge, { CodeMirrorMergeProps } from 'react-codemirror-merge';
import { EditorView } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { langs } from '@uiw/codemirror-extensions-langs';
import { originalCode, modifiedCode } from './code';
import { useTheme } from '../../utils/useTheme';

const Original = CodeMirrorMerge.Original;
const Modified = CodeMirrorMerge.Modified;

export const MergeExample = () => {
  const [orientation, setOrientation] = useState<CodeMirrorMergeProps['orientation']>('a-b');
  const [revertControls, setRevertControls] = useState<CodeMirrorMergeProps['revertControls']>();
  const [highlightChanges, setHighlightChanges] = useState<CodeMirrorMergeProps['highlightChanges']>(true);
  const [gutter, setGutter] = useState<CodeMirrorMergeProps['gutter']>(true);
  const [collapseUnchanged, setCollapseUnchanged] = useState<CodeMirrorMergeProps['collapseUnchanged']>({});
  const { theme } = useTheme();
  const handleOrientation = (evn: React.ChangeEvent<HTMLSelectElement>) => {
    setOrientation(evn.target.value as CodeMirrorMergeProps['orientation']);
  };
  const [originalValue, setOriginalValue] = useState(originalCode);
  const random = useRef<number>();
  const click = () => {
    random.current = Math.floor(Math.random() * 101);
    const code = '// hello world' + random.current + '\n' + originalCode;
    setOriginalValue(code);
  };
  return (
    <Fragment>
      <button onClick={click}>Change Original Value {random.current}</button>
      <CodeMirrorMerge
        orientation={orientation}
        revertControls={revertControls}
        collapseUnchanged={collapseUnchanged}
        highlightChanges={highlightChanges}
        gutter={gutter}
        style={{ height: 300, overflow: 'auto' }}
        theme={theme}
      >
        <Original
          value={originalValue}
          extensions={[langs.javascript()]}
          onChange={(val) => {
            // console.log('::::::::::', val)
          }}
        />
        <Modified
          value={modifiedCode}
          extensions={[langs.javascript(), EditorView.editable.of(false), EditorState.readOnly.of(true)]}
        />
      </CodeMirrorMerge>
      <label>
        Orientation
        <select onChange={handleOrientation} defaultValue={orientation}>
          <option value="">please orientation choose</option>
          <option value="a-b">a-b</option>
          <option value="b-a">b-a</option>
        </select>
      </label>
      <br />
      <label>
        Revert buttons
        <select
          defaultValue={revertControls}
          onChange={(evn) => setRevertControls(evn.target.value as CodeMirrorMergeProps['revertControls'])}
        >
          <option value="">please revertControls choose</option>
          <option value="a-to-b">a-to-b</option>
          <option value="b-to-a">b-to-a</option>
        </select>
      </label>
      <br />
      <label>
        Highlight changes
        <input
          type="checkbox"
          checked={!!highlightChanges}
          onChange={(evn) => setHighlightChanges(evn.target.checked)}
        />
      </label>
      <br />
      <label>
        Gutter markers
        <input type="checkbox" checked={!!gutter} onChange={(evn) => setGutter(evn.target.checked)} />
      </label>
      <label>
        Collapse unchanged code
        <input
          type="checkbox"
          checked={!!collapseUnchanged}
          onChange={(evn) => setCollapseUnchanged(evn.target.checked ? {} : undefined)}
        />
      </label>
    </Fragment>
  );
};
