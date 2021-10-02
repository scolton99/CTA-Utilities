interface IPane {
    shouldSkip: () => boolean,
    show:       () => Promise<void>,
    hide:       () => Promise<void>,
    prepare:    () => Promise<void>
}

export default IPane;