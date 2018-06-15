class AddUniqueNameToCompany < ActiveRecord::Migration[5.1]
  def change
        add_index :companies, :name, unique: true
        add_index :difficulties, :level, unique: true
        add_index :categories, :name, unique: true
  end
end
