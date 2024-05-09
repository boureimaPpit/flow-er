
const loadRenderer = () => {
    const register = {}
    return {
        register: (name, view) => { register[name] = view },
        retrieve: (name) => { return register[name] }
    }
}

module.exports = {
    loadRenderer
}