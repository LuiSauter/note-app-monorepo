const ButtonShowAll = ({ handleShowAll, showAll }) => {
  return (
    <button onClick={handleShowAll}>
      {showAll ? 'Show only important' : 'Show all'}
    </button>
  )
}

export default ButtonShowAll
