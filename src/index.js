import React, { useRef, useEffect, useImperativeHandle, useState, useMemo } from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/mode/meta';
import './codemirror.css';
import './index.css';

const defaultOptions = {
  tabSize: 2,
  autoCloseBrackets: true,
  matchBrackets: true,
  showCursorWhenSelecting: true,
  // 显示行号
  lineNumbers: true,
  fullScreen: true,
}

function ReactCodeMirror(props = {}, ref) {
  const { options = {}, value = '', width = '100%', height = '100%'  } = props;
  const [editor, setEditor] = useState();
  const textareaRef = useRef();
  useImperativeHandle(ref, () => ({ editor }), [editor]);
  // 将props中所有的事件处理函数映射并保存
  function getEventHandleFromProps() {
    const propNames = Object.keys(props);
    const eventHandle = propNames.filter((keyName) => {
      return /^on+/.test(keyName);
    });

    const eventDict = {};
    eventHandle.forEach((ele) => {
      const name = ele.slice(2);
      eventDict[ele] = name.replace(name[0],name[0].toLowerCase());
    });

    return eventDict;
  }

  useEffect(() => {
    if (!editor) {
      // 生成codemirror实例
      const instance = CodeMirror.fromTextArea(textareaRef.current, {...defaultOptions, ...options});
      const eventDict = getEventHandleFromProps();
      Object.keys(eventDict).forEach((event) => {
        instance.on(eventDict[event], props[event]);
      });
      instance.setValue(value || '');

      if (width || height) {
        // 设置尺寸
        instance.setSize(width, height);
        setEditor(undefined);
      }
      setEditor(instance);
    }
    return () => {
      if (editor) {
        editor.toTextArea();
      }
    }
  }, []);

  useMemo(() => {
    if (!editor) return;
    const val = editor.getValue();
    if (value !== undefined && value !== val) {
      editor.setValue(value);
    }
  }, [value]);

  useMemo(() => {
    if (!editor) return;
    editor.setSize(width, height);
  }, [width, height]);


  // http://codemirror.net/doc/manual.html#config
  async function setOptions(opt = {}) {
    if (typeof opt === 'object') {
      const mode = CodeMirror.findModeByName(opt.mode);
      if (mode && mode.mode) {
        await import(`codemirror/mode/${mode.mode}/${mode.mode}.js`);
      }
      if (mode) {
        opt.mode = mode.mime;
      }
      Object.keys(opt).forEach((name) => {
        if (opt[name] && JSON.stringify(opt[name])) {
          editor.setOption(name, opt[name]);
        }
      });
    }
  }

  useMemo(() => {
    if (!editor) return;
    setOptions({...defaultOptions, ...options});
  }, [options]);
  
  return (
    <textarea ref={textareaRef} />
  );
}

export default React.forwardRef(ReactCodeMirror);