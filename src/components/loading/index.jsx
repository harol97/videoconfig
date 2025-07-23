import CircularProgress from '@mui/material/CircularProgress';
// 
const PageLoading = () => {
  const style = {
    display: 'block',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
  return <div style={style}>
    <CircularProgress />
  </div>
}

export default PageLoading;