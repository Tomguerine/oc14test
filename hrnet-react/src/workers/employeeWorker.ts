/// <reference lib="webworker" />

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  department: string;
  startDate?: string;
  dateOfBirth?: string;
}

interface SortConfig {
  key: keyof Employee;
  direction: 'asc' | 'desc';
}

interface WorkerPayload {
  employees: Employee[];
  sortConfig: SortConfig | null;
  globalFilter: string;
}

addEventListener('message', (event: MessageEvent<WorkerPayload>) => {
  const { employees, sortConfig, globalFilter } = event.data;

  const sorted = sortConfig
    ? [...employees].sort((a, b) => {
        const aVal = a[sortConfig.key];
        const bVal = b[sortConfig.key];
        const cmp = String(aVal).localeCompare(String(bVal));
        return sortConfig.direction === 'asc' ? cmp : -cmp;
      })
    : employees;

  const lower = globalFilter.toLowerCase();
  const filtered = globalFilter
    ? sorted.filter(emp =>
        Object.values(emp).some(val =>
          String(val).toLowerCase().includes(lower),
        ),
      )
    : sorted;

  postMessage(filtered);
});

export {};
