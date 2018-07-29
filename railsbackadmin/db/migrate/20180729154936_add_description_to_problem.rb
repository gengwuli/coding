class AddDescriptionToProblem < ActiveRecord::Migration[5.1]
  def change
    add_column :problems, :description, :text
  end
end
