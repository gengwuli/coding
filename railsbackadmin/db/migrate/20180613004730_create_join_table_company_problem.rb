class CreateJoinTableCompanyProblem < ActiveRecord::Migration[5.1]
  def change
    create_join_table :companies, :problems do |t|
      # t.index [:company_id, :problem_id]
      # t.index [:problem_id, :company_id]
    end
  end
end
