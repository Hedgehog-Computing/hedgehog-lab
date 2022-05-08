const useApp = () => {
    const hostPath = window.location.host

    const isDevPath = hostPath !== 'hlab.app'

    return {
        isDevPath
    }
}

export default useApp
