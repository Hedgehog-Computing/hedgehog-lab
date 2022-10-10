const toCapitalize = (string: string): string => {
    return string.toLowerCase().replace(/(^\w)|(\s\w)/g, match => match.toUpperCase())
}

export default toCapitalize
