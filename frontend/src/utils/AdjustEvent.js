
export const adjestuedTop = (modalPosition) => {
    const windowHeight = window.innerHeight;
    if (modalPosition.y > windowHeight - 100) {
        return modalPosition.y - 100;
    } else {
        return modalPosition.y
    }
}
export const adjestuedLeft = (modalPosition) => {
    const windowWidth = window.innerWidth;
    if ((windowWidth - modalPosition.x) > windowWidth - 300) {
        return modalPosition.x + 300;
    } else {
        return modalPosition.x
    }
}