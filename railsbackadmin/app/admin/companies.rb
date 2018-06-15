ActiveAdmin.register Company do
  permit_params :name, problem_ids: []
end
