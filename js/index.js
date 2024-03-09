createListTrailers = (parrent, srcList) => {
	const trailersList = document.createElement('ul')
	trailersList.classList.add('trailers__list')
	parrent.append(trailersList)

	const trailerWrappers = []
	const trailerFrames = []

	srcList.forEach(src => {
		const trailersItem = document.createElement('li')
		trailersItem.classList.add('trailers__item')
		trailersList.append(trailersItem)

		const trailersWrapper = document.createElement('div')
		trailersWrapper.classList.add('trailers__wrapper')
		trailersItem.append(trailersWrapper)
		trailerWrappers.push(trailersWrapper)

		const trailersVideo = document.createElement('iframe')
		trailersVideo.classList.add('trailers__video')
		trailersVideo.dataset.src = src
		trailersWrapper.append(trailersVideo)
		trailerFrames.push(trailersVideo)
	})

	return { trailerWrappers, trailerFrames }
}

const controlTrailer = (trailerWrappers, trailerFrames, i = 0, j = 0) => {
	if (i !== j) {
		trailerWrappers[i].style.display = 'none'
		trailerFrames[i].src = ''
	} else {
		trailerWrappers[i].style.display = 'block'
		trailerFrames[i].src = trailerFrames[i].dataset.src
	}
}

const init = () => {
	const trailersContainer = document.querySelector('.trailers__container')
	const trailersButtons = document.querySelectorAll('.trailers__button')

	const srcList = []

	trailersButtons.forEach(btn => {
		srcList.push(btn.dataset.src)
	})

	const { trailerWrappers, trailerFrames } = createListTrailers(trailersContainer, srcList)

	trailersButtons.forEach((btn, j) => {
		btn.addEventListener('click', () => {
			trailersButtons.forEach((tBtn, i) => {
				if (tBtn === btn) {
					tBtn.classList.add('trailers__button_active')
				} else {
					tBtn.classList.remove('trailers__button_active')
				}

				controlTrailer(trailerWrappers, trailerFrames, i, j)
			})
		})
	})

	controlTrailer(trailerWrappers, trailerFrames)
}

init()
