import "../../common/styles/styles.scss"

import { attachEventListeners } from "./eventListeners"
import { loadState, saveState } from "./george"
import { render } from "./render"
import { createStore } from "./store"

const { dispatch, subscribe, getState } = createStore(loadState())

const saveSubscription = subscribe(saveState)

// const spySubscription = subscribe((state) => {
//   const spy = <HTMLElement>document.getElementById("spy")

//   spy.innerHTML = JSON.stringify(state, null, 2)
// })

const renderSubscription = subscribe(render)

let initialRender = true

render(getState())

attachEventListeners({ document, dispatch, getState })

if (module.hot) {
  module.hot.accept()
}
