import React from 'react'
import CodeMirror from '@uiw/react-codemirror';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompressAlt, faExpandAlt } from '@fortawesome/free-solid-svg-icons';
import { EditorView } from '@codemirror/view';
import { darcula } from '@uiw/codemirror-theme-darcula';


export default function Editor(props) {
  const { displayName, classDisplayName, value, onChange, extension } = props;
  const [open, setOpen] = React.useState(true)

  function handleChange(editor, data, value) {
    onChange(editor)
  }

  return (
    <div className={`editor-container ${open ? '' : 'collapsed'}`}>
      <div className='editor-title'>
        <span className={classDisplayName}>{displayName}</span>
        <button onClick={() => setOpen(!open)} className="expand-collapse-btn">
          <FontAwesomeIcon icon={open ? faCompressAlt : faExpandAlt} />
        </button>
      </div> 

      <CodeMirror
        height='100%'
        value={value}
        extensions={[extension, EditorView.lineWrapping]}
        onChange={handleChange}
        className="codemirror-wrapper"
        theme={darcula}
        lazyLoadMode={true}
      />
    </div>
  )
}
