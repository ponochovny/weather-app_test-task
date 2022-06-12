import './index.scss'

function Pagination(props) {
  const {changePage, activePage, listLength} = props
  const pages = Math.ceil((listLength/5))

  console.log('... pages', pages)

  return (
    <div className='Pagination'>
      {
        [...Array(pages)].map((_, i) => {
          console.log(_, i)
          return <button disabled={activePage === (i + 1)} key={Math.random()} onClick={() => {
            console.log('test')
            changePage((i+1))
          }}>{(i+1)}</button>
        })
      }
    </div>
  )
}

export default Pagination