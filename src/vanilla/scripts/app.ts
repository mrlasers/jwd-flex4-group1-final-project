import "../../common/styles/styles.scss"

import { attachEventListeners } from "./events"
import { loadState, saveState } from "./george"
import { render } from "./render"
import { createStore } from "./store"

const { dispatch, subscribe, getState } = createStore(loadState())

subscribe((state) => {
  return ((document.getElementById("spy") as HTMLElement).innerText =
    JSON.stringify(state, null, 2))
})

const saveSubscription = subscribe(saveState)
const renderSubscription = subscribe(render)

let initialRender = true

render(getState())

attachEventListeners({ document, dispatch, getState })

if (module.hot) {
  module.hot.accept()
}
