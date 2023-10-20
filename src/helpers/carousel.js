export const carousel = (container, btns, cards) => {
    cards[0].classList.add('active')

    Array.from(btns).map( (btn, i) => {
        btn.addEventListener('click', () => {
            const index = i
            const button = btns[i]
            carouselTransition(container, btns, cards, button, index)

            button.classList.remove('active')
        })
    } )

    setInterval(() => {
        setTimeout(() => {
            carouselAuto(container, cards, btns, 1, 2, 0, 1)
        }, 5000)

        setTimeout(() => {
            carouselAuto(container, cards, btns, 2, 3, 1, 2)
        }, 10000)

        setTimeout(() => {
            carouselAuto(container, cards, btns, 3, 2, 2, 1)
        }, 15000)

        setTimeout(() => {
            carouselAuto(container, cards, btns, 2, 1, 1, 0)
        }, 20000)

    }, 22500)
}

const carouselTransition = (container, btns, cards, btn, i) => {
    console.log(btns[i])
    Array.from(btns).map( (active) => {
        if(active.classList.contains('active')) active.classList.remove('active')
    } )
    Array.from(cards).map( (card) => {
        if(card.classList.contains('active')) card.classList.remove('active')
    } )

    btn.classList.add('active')
    cards[i].classList.add('active')

    if(i === 0) container.style.transform = 'translateX(0)'
    if(i === 1) container.style.transform = 'translateX(-33.9%)'
    if(i === 2) container.style.transform = 'translateX(-67.9%)'
}

const carouselAuto = (container, cards, btns, card_1, card_2, index_1, index_2) => {
    container.removeAttribute('style')
    container.classList.remove(`active-card-${card_1}`)
    container.classList.add(`active-card-${card_2}`)
    cards[index_1].classList.remove('active')
    btns[index_1].classList.remove('active')
    cards[index_2].classList.add('active')
    btns[index_2].classList.add('active')
}