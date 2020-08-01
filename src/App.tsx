import * as React from 'react';
import { useFormik } from 'formik'

function getRandomInt() {
  const min = 0
  const max = 255
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function App() {
  const formik = useFormik({
    initialValues: {
      texts: '',
    },
    
    onSubmit: () => {} // noop
  })
  const result = React.useMemo(() => {
    const texts = formik.values.texts.trim()
    if(!texts) return ''
    return texts.split('\n').map((text) => {
      const code = Array(8).fill('').map(() => getRandomInt().toString(16).padStart(2, '0').toUpperCase()).join('').replace(/(\w{8})/, '$1 ')
      if(!text) return code
      return `${text}\n${code}`
    }).join('\n')
  }, [formik.values.texts])
  const tweet = React.useCallback(() => {
    const w = 550
    const h = 420
    const text = `${result}\n\n${window.location.href}`
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,"_blank","width="+w+",height="+h+",left="+(window.screen.width-w)/2+",top="+(window.screen.height-h)/2+",scrollbars=yes,resizable=yes,toolbar=no,location=yes")
  }, [result])
  return (
    <div>
      <header>
        <h1>チートコードっぽいのを生成するやつ</h1>
      </header>
      <main>
        <label>
          入力テキスト(改行区切り)
          <textarea data-testid="input" rows={10} name="texts" value={formik.values.texts} onChange={formik.handleChange} style={{ display: 'block', width: '100%'}} />
        </label>
        <h2>生成結果</h2>
        <textarea data-testid="output" rows={10} readOnly style={{ display: 'block', width: '100%'}} value={result} />
      </main>
      <button onClick={tweet}>ツイートする</button>
      <footer>
        <hr/>
        <ul>
          <li><a href="https://twitter.com/">@_X_y_z_</a></li>
          <li><a href="https://unsweets.net/">&lt;unsweets/&gt;</a></li>
          <li><a href="https://github.com/sunya9/ese-cheatcode-generator">source code</a></li>
        </ul>
      </footer>
    </div>
  );
}

export default App;
