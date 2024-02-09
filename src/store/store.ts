import { atom } from "jotai";
import { Element } from "../types/Common";
import { atomWithImmer } from "jotai-immer";

export const elementsAtom = atomWithImmer<Element[]>([])

export const addElementsAtom = atom(
  null,
  (_get, set, newElement: Element) => {
    set(elementsAtom, (prev) => [...prev, { ...newElement, id: crypto.randomUUID() }])
  }
)

export const updateElementsAtom = atom(
  null,
  (_get, set, updatedElement: Element) => {
    set(elementsAtom, (prev) => prev.map((el) =>
      el.id === updatedElement.id ? updatedElement : el,
    ))
  }
)
