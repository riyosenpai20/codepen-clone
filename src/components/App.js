import React from 'react';
import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { css, cssCompletionSource } from '@codemirror/lang-css';
import useLocalStorage from '../hooks/useLocalStorage';
import Editor from './Editor';

function App() {
  const [varHtml, setHtml] = useLocalStorage('varHtml', '');
  const [varCss, setCss] = useLocalStorage('varCss', '');
  const [varJs, setJs] = useLocalStorage('varJs', '');

  const [srcDoc, setSrcDoc] = React.useState('')

  React.useEffect(() => {
    const timeOut = setTimeout(() => {
      setSrcDoc(
        `
        <html>
          <style>${varCss}</style>
          <body>
          ${varHtml}
          <script type="text/javascript">${varJs}</script>
          </body>
        </html>
        `
      )
    }, 500)

    return () => clearTimeout(timeOut)
  }, [varHtml, varCss, varJs])

  return (
    <div className='w-screen'>
      <div className='header'>
        <h1>SimpleEditor</h1>
        <p>CodePen Clone</p>
      </div>
      <div className='pane top-pane'>
        <Editor 
          displayName="HTML" 
          value={varHtml}
          extension={html({ 
            autoCloseTags:true
          })
        }
          onChange={setHtml}
          classDisplayName="HTML"
        />
        <Editor 
          displayName="CSS" 
          value={varCss}
          extension={[css({ cssCompletionSource })]}
          onChange={setCss}
          classDisplayName="CSS"
        />
        <Editor 
          displayName="JS"
          value={varJs} 
          extension={[javascript()]}
          onChange={setJs}
          classDisplayName="JS"
        />
      </div>
      {/* <div className='second-pane'> */}
        {/* a */}
        {/* <iframe srcDoc={srcDoc} title="output" width="100%" /> */}
      {/* </div> */}
      <div class="second-pane">
          {/* <iframe title='output' sandbox='allow-scipts' frameBorder="0" width="100%" height="100%" srcDoc={srcDoc} class="ifr" /> */}
          <iframe class="ifr" srcDoc={srcDoc} title="output" width="100%" />
      </div>
    </div>
    
    
  );
}
export default App;
