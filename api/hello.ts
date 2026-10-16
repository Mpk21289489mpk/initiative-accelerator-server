export default (req, res) => {
  // Тестовые данные — чтобы фронт сразу видел список
  const mockInitiatives = [
    { id: 1, name: 'Accelerator Sprint 1', status: 'in_progress', progress: 45 },
    { id: 2, name: 'UI Refactor', status: 'planned', progress: 0 },
    { id: 3, name: 'Data Pipeline Setup', status: 'completed', progress: 100 }
  ];

  res.status(200).json({
    message: 'Backend is up!',
    data: mockInitiatives,
    time: new Date().toISOString()
  });
};
