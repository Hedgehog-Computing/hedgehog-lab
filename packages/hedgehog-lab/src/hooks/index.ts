export const useQuery = () => {
  return window.location.search.length > 1 ?
    window.location.search.slice(1).split('&').map(item => ({[item.split('=')[0]]: item.split('=')[1]})).reduce((prev, item) => ({...prev, ...item}), {})
    :
    {}
}
