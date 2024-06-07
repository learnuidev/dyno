"use client";
import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";

export const useHistoryStore = create(
  persist(
    (set: any, get: any) => ({
      history: [
        {
          id: crypto.randomUUID(),
          type: "query:tableName",
          createdAt: Date.now(),
          query: "wwt",
          tableName: "nomadmethod-api-dev-ComponentsTable2-PVEY9E82WWT0",
          profile: "default",
        },
        {
          id: "5ef9f936-961e-40bf-9e07-e4d9c8df97f2",
          type: "clone",
          steps: [
            {
              stepId: "select-table",
              stepNumber: 1,
              startTime: Date.now(),
              endTime: Date.now(),
              tableName: "nomadmethod-api-dev-ComponentsTable2-PVEY9E82WWT0",
            },
            {
              stepId: "new-table-name",
              stepNumber: 2,
              startTime: Date.now(),
              endTime: Date.now(),
              tableName: "nomadmethod-api-dev-ComponentsTable2-PVEY9E82WWT0",
            },
            {
              stepId: "select-attributes",
              stepNumber: 3,
              startTime: Date.now(),
              endTime: Date.now(),
              attributes: [],
            },
            {
              stepId: "creating-table",
              stepNumber: 5,
              startTime: Date.now(),
              endTime: Date.now(),
            },
            {
              stepId: "checking-table-status",
              stepNumber: 6,
              startTime: Date.now(),
              endTime: Date.now(),
            },
            {
              stepId: "populating-table",
              stepNumber: 7,
              startTime: Date.now(),
              endTime: Date.now(),
            },
          ],
          createdAt: Date.now(),
        },
      ],
      setHistory: (event: any) => set({ history: get().history.concat(event) }),
      clearHistory: (event: any) => set({ history: [] }),
    }),
    {
      name: "dyno/history", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

type CloneStepStatus =
  | "select-table"
  | "new-table-name"
  | "select-attributes"
  | "preview"
  | "creating-table"
  | "checking-table-status"
  | "populating-table"
  | "done";
