class AddUniqueIndexToJointTables < ActiveRecord::Migration[5.1]
  def change
  	add_index :companies_problems, [:company_id, :problem_id], :unique => true
  	add_index :categories_problems, [:category_id, :problem_id], :unique => true
  end
end
