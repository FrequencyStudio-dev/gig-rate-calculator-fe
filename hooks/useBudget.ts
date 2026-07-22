"use client"

import { useCallback, useState } from "react"

import {
  DEFAULT_GOAL_TYPE,
  DEFAULT_GOAL_VALUE,
  DEFAULT_MEMBERS,
} from "@/features/calculator/constants"
import type {
  BudgetState,
  Expense,
  Goal,
  Show,
} from "@/features/calculator/types"

/* Estado inicial: show con 1 integrante, sin gastos y objetivo total en 0 */
const INITIAL_STATE: BudgetState = {
  show: { members: DEFAULT_MEMBERS, eventName: "", eventType: "" },
  expenses: [],
  goal: { type: DEFAULT_GOAL_TYPE, value: DEFAULT_GOAL_VALUE },
}

export interface UseBudget {
  state: BudgetState
  setShowInfo: (patch: Partial<Show>) => void
  addExpense: (input: Omit<Expense, "id">) => void
  updateExpense: (id: string, patch: Partial<Omit<Expense, "id">>) => void
  removeExpense: (id: string) => void
  setGoal: (patch: Partial<Goal>) => void
}

export function useBudget(): UseBudget {
  const [state, setState] = useState<BudgetState>(INITIAL_STATE)

  const setShowInfo = useCallback((patch: Partial<Show>) => {
    setState((prev) => ({ ...prev, show: { ...prev.show, ...patch } }))
  }, [])

  const addExpense = useCallback((input: Omit<Expense, "id">) => {
    setState((prev) => ({
      ...prev,
      expenses: [...prev.expenses, { id: crypto.randomUUID(), ...input }],
    }))
  }, [])

  const updateExpense = useCallback(
    (id: string, patch: Partial<Omit<Expense, "id">>) => {
      setState((prev) => ({
        ...prev,
        expenses: prev.expenses.map((expense) =>
          expense.id === id ? { ...expense, ...patch } : expense,
        ),
      }))
    },
    [],
  )

  const removeExpense = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      expenses: prev.expenses.filter((expense) => expense.id !== id),
    }))
  }, [])

  const setGoal = useCallback((patch: Partial<Goal>) => {
    setState((prev) => ({ ...prev, goal: { ...prev.goal, ...patch } }))
  }, [])

  return {
    state,
    setShowInfo,
    addExpense,
    updateExpense,
    removeExpense,
    setGoal,
  }
}
